const express = require('express')
const router = express.Router()
const db = require('../config/database')

// 用户登录
router.post('/Userlogin', async (req, res) => {
  const { username, password, role } = req.body
  
  if (!username || !password || !role) {
    return res.json({ code: 400, message: '参数不完整' })
  }

  try {
    // 查询数据库验证用户
    const [rows] = await db.pool.execute(
      'SELECT * FROM users WHERE username = ? AND password = ? AND role = ?',
      [username, password, role]
    )
    
    if (rows.length === 0) {
      return res.json({ code: 401, message: '用户名或密码错误' })
    }
    
    const user = rows[0]
    
    // 生成简单token
    const token = Buffer.from(`${username}:${role}`).toString('base64')
    
    res.json({
      code: 200,
      message: '登录成功',
      data: {
        token: token,
        userInfo: {
          username: user.username,
          role: user.role
        }
      }
    })
    
  } catch (error) {
    console.error('登录错误:', error)
    res.json({ code: 500, message: '服务器错误' })
  }
})

// 获取用户信息
router.get('/getUserInfo', async (req, res) => {
  const token = req.headers.authorization
  
  if (!token) {
    return res.json({ code: 401, message: '未登录' })
  }
  
  try {
    // 解析token获取用户信息
    const decoded = Buffer.from(token, 'base64').toString()
    const [username, role] = decoded.split(':')
    
    res.json({
      code: 200,
      data: {
        username: username,
        role: role
      }
    })
    
  } catch (error) {
    res.json({ code: 401, message: 'token无效' })
  }
})

module.exports = router