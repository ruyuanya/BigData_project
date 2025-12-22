const express = require('express');
const router = express.Router();
const { pool } = require('../config/database');

// 用户登录
router.post("/Userlogin", async (req, res) => {
    try {
        const { username, password, role } = req.body;
        
        // 验证必填字段
        if (!username || !password || !role) {
            return res.status(400).json({
                code: 400,
                message: '用户名、密码和身份不能为空'
            });
        }

        // 查询数据库中的用户
        const [rows] = await pool.execute(
            'SELECT * FROM users WHERE username = ? AND role = ?',
            [username, role]
        );

        // 验证用户是否存在
        if (rows.length === 0) {
            return res.status(401).json({
                code: 401,
                message: '用户不存在或身份选择错误'
            });
        }

        const user = rows[0];

        // 验证密码（假设密码在数据库中存储为明文，实际项目中应该使用加密）
        if (user.password !== password) {
            return res.status(401).json({
                code: 401,
                message: '密码错误'
            });
        }

        // 生成token
        const token = generateToken(user.id, user.role);

        // 返回成功响应
        res.json({
            code: 200,
            message: '登录成功',
            data: {
                token: token,
                userId: user.id,
                username: user.username,
                role: user.role,
                real_name: user.real_name || user.username
            }
        });

    } catch (error) {
        console.error('登录错误:', error);
        res.status(500).json({
            code: 500,
            message: '服务器内部错误'
        });
    }
});

// 生成简单token（实际项目中应使用JWT）
function generateToken(userId, role) {
    return Buffer.from(`${userId}:${role}:${Date.now()}`).toString('base64');
}

// 获取用户信息
router.get("/getUserInfo", async (req, res) => {
    try {
        // 从请求头获取token
        const token = req.headers.authorization?.replace('Bearer ', '');

        if (!token) {
            return res.status(401).json({
                code: 401,
                message: '未提供认证令牌'
            });
        }

        // 解析token（简单实现）
        const tokenData = Buffer.from(token, 'base64').toString();
        const [userId, role] = tokenData.split(':');

        // 查询数据库中的用户信息
        const [rows] = await pool.execute(
            'SELECT id, username, role, real_name FROM users WHERE id = ? AND role = ?',
            [userId, role]
        );

        if (rows.length === 0) {
            return res.status(401).json({
                code: 401,
                message: '用户不存在'
            });
        }

        const user = rows[0];

        res.json({
            code: 200,
            message: '获取成功',
            data: user
        });

    } catch (error) {
        console.error('获取用户信息错误:', error);
        res.status(500).json({
            code: 500,
            message: '服务器内部错误'
        });
    }
});

module.exports = router;