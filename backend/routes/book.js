const express = require('express');
const router = express.Router();
const { pool } = require('../config/database');

// 用户登录接口
router.post('/Userlogin', async (req, res) => {
  const { username, password, role } = req.body;
  
  if (!username || !password || !role) {
    return res.json({ code: 400, message: '参数不完整' });
  }

  try {
    // 调用简单的存储过程
    const [rows] = await pool.execute(
      'CALL UserLogin(?, ?, ?)',
      [username, password, role]
    );
    
    // 简单的存储过程直接返回用户信息
    if (rows[0].length > 0) {
      const user = rows[0][0];
      // 生成token
      const token = Buffer.from(`${user.username}:${user.role}:${Date.now()}`).toString('base64');
      
      res.json({
        code: 200,
        message: '登录成功',
        data: {
          token: token,
          userInfo: {
            id: user.id,
            username: user.username,
            role: user.role
          }
        }
      });
    } else {
      res.json({ code: 401, message: '用户名或密码错误' });
    }
    
  } catch (error) {
    console.error('登录错误:', error);
    res.json({ code: 500, message: '服务器错误' });
  }
});

router.get('/getUserInfo', async (req, res) => {
  const token = req.headers.authorization;
  
  if (!token) {
    return res.json({ code: 401, message: '未登录' });
  }
  
  try {
    const [rows] = await pool.execute(
      'CALL GetUserInfo(?)',
      [token]
    );
    if (rows[0].length > 0) {
      const user = rows[0][0];
      
      res.json({
        code: 200,
        message: '获取成功',
        data: {
          id: user.id,
          username: user.username,
          role: user.role
        }
      });
    } else {
      res.json({ code: 401, message: 'token无效' });
    }
    
  } catch (error) {
    res.json({ code: 401, message: 'token无效' });
  }
});

// 图书管理接口保持不变
router.route("/").get((req, res) => {
    postmysql(req, res, "getBooks");
});

router.route("/").post((req, res) => {
    postmysql(req, res, "addBook");
});

router.route("/:id").put((req, res) => {
    postmysql(req, res, "updateBook");
});

router.route("/:id").delete((req, res) => {
    postmysql(req, res, "deleteBook");
});

function postmysql(req, res, action) {
    // 模拟数据返回
    const mockData = {
        getBooks: {
            code: 200,
            data: [
                {
                    id: 1,
                    title: 'Vue.js设计与实现',
                    author: '霍春阳',
                    isbn: '9787115585629',
                    category: '前端',
                    publisher: '人民邮电出版社',
                    total: 10,
                    available: 8,
                    status: 1
                },
                {
                    id: 2,
                    title: 'JavaScript高级程序设计',
                    author: 'Matt Frisbie',
                    isbn: '9787115599754',
                    category: '前端',
                    publisher: '人民邮电出版社',
                    total: 15,
                    available: 5,
                    status: 0
                },
                {
                    id: 3,
                    title: '深入理解计算机系统',
                    author: 'Randal E. Bryant',
                    isbn: '9787111544937',
                    category: '计算机基础',
                    publisher: '机械工业出版社',
                    total: 8,
                    available: 8,
                    status: 1
                }
            ],
            total: 2,
            message: '获取成功'
        },
        addBook: {
            code: 200,
            message: '添加成功'
        },
        updateBook: {
            code: 200,
            message: '更新成功'
        },
        deleteBook: {
            code: 200,
            message: '删除成功'
        }
    };
    
    // 模拟延迟
    setTimeout(() => {
        res.json(mockData[action] || { code: 404, message: '接口不存在' });
    }, 500);
}

module.exports = router;