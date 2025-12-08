const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { testConnection } = require('./config/database');

const app = express();
const PORT = process.env.PORT || 3000;

// 中间件
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 路由
app.use('/api/books', require('./routes/book'));

// 健康检查接口
app.get('/api/health', (req, res) => {
  res.json({ 
    code: 200, 
    message: '服务正常运行',
    timestamp: new Date().toISOString()
  });
});

// 启动服务器
async function startServer() {
  // 测试数据库连接
  const dbConnected = await testConnection();
  
  if (!dbConnected) {
    console.log('⚠️  使用模拟数据模式（数据库未连接）');
    
    // 模拟数据路由
//     app.use('/api/books', require('./routes/mock-books'));
  }
  
  app.listen(PORT, () => {
    console.log(`🚀 服务器运行在 http://localhost:${PORT}`);
    console.log(`📚 API接口: http://localhost:${PORT}/api/books`);
    console.log(`❤️  健康检查: http://localhost:${PORT}/api/health`);
  });
}

startServer();