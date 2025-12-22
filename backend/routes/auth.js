const express = require('express');
const router = express.Router();
const { pool } = require('../config/database');

// 用户登录
router.post('/login', async (req, res) => {
    try {
        const { username, password, role } = req.body;
        
        // 参数验证
        if (!username || !password || !role) {
            return res.status(400).json({
                code: 400,
                message: '用户名、密码和角色为必填项'
            });
        }

        try {
            // 尝试调用存储过程
            const [results] = await pool.execute(
                'CALL sp_verify_login(?, ?, ?)',
                [username, password, role]
            );

            const loginResult = results[0][0];
            
            if (loginResult.success) {
                // 登录成功
                res.json({
                    code: loginResult.code,
                    message: loginResult.message,
                    data: {
                        id: loginResult.id,
                        username: loginResult.username,
                        role: loginResult.role,
                        real_name: loginResult.real_name,
                        token: generateToken(loginResult.id, loginResult.role)
                    }
                });
            } else {
                // 登录失败
                res.status(loginResult.code).json({
                    code: loginResult.code,
                    message: loginResult.message
                });
            }
        } catch (spError) {
            // 存储过程调用失败，使用直接查询方式（避免only_full_group_by错误）
            console.log('存储过程调用失败，使用直接查询方式:', spError.message);
            
            // 使用LIMIT 1来避免聚合函数问题
            const [users] = await pool.execute(
                'SELECT id, username, role, real_name FROM users WHERE username = ? AND password = ? AND role = ? AND status = 1 LIMIT 1',
                [username, password, role]
            );
            
            if (users.length > 0) {
                // 登录成功
                await pool.execute(
                    'UPDATE users SET last_login_time = NOW() WHERE id = ?',
                    [users[0].id]
                );
                
                res.json({
                    code: 200,
                    message: '登录成功',
                    data: {
                        id: users[0].id,
                        username: users[0].username,
                        role: users[0].role,
                        real_name: users[0].real_name,
                        token: generateToken(users[0].id, users[0].role)
                    }
                });
            } else {
                // 登录失败
                res.status(401).json({
                    code: 401,
                    message: '用户名或密码错误'
                });
            }
        }
    } catch (error) {
        console.error('登录失败:', error);
        res.status(500).json({
            code: 500,
            message: '登录失败，服务器错误: ' + error.message
        });
    }
});

// 生成简单token（实际项目中应使用JWT）
function generateToken(userId, role) {
    return Buffer.from(`${userId}:${role}:${Date.now()}`).toString('base64');
}

// 用户注册
router.post('/register', async (req, res) => {
    try {
        const { username, password, role, real_name, email, phone } = req.body;
        
        // 参数验证
        if (!username || !password || !role || !real_name) {
            return res.status(400).json({
                code: 400,
                message: '用户名、密码、角色和真实姓名为必填项'
            });
        }

        // 检查用户名是否已存在
        const [existingUsers] = await pool.execute(
            'SELECT id FROM users WHERE username = ?',
            [username]
        );

        if (existingUsers.length > 0) {
            return res.status(409).json({
                code: 409,
                message: '用户名已存在'
            });
        }

        // 插入新用户
        const [result] = await pool.execute(
            'INSERT INTO users (username, password, role, real_name, email, phone) VALUES (?, ?, ?, ?, ?, ?)',
            [username, password, role, real_name, email || null, phone || null]
        );

        res.json({
            code: 200,
            message: '注册成功',
            data: { id: result.insertId }
        });
    } catch (error) {
        console.error('注册失败:', error);
        res.status(500).json({
            code: 500,
            message: '注册失败，服务器错误'
        });
    }
});

// 获取用户信息
router.get('/userinfo', async (req, res) => {
    try {
        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({
                code: 401,
                message: '未提供认证信息'
            });
        }

        // 解析token获取用户ID（简化版）
        const tokenData = Buffer.from(token, 'base64').toString();
        const [userId] = tokenData.split(':');

        const [users] = await pool.execute(
            'SELECT id, username, role, real_name, email, phone, last_login_time FROM users WHERE id = ? AND status = 1',
            [userId]
        );

        if (users.length === 0) {
            return res.status(404).json({
                code: 404,
                message: '用户不存在'
            });
        }

        res.json({
            code: 200,
            data: users[0]
        });
    } catch (error) {
        console.error('获取用户信息失败:', error);
        res.status(500).json({
            code: 500,
            message: '获取用户信息失败'
        });
    }
});

module.exports = router;