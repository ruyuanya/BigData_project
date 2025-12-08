const mysql = require('mysql2/promise');

// 数据库配置 - 请根据您的数据库信息修改
const dbConfig = {
  host: '101.35.108.167',
  user: 'root', // 您的数据库用户名
  password: 'BigData114514', // 您的数据库密码
  database: 'bigdata', // 您的数据库名
  port: 3306
};

// 创建连接池
const pool = mysql.createPool(dbConfig);

// 测试连接
async function testConnection() {
  try {
    const connection = await pool.getConnection();
    console.log('数据库连接成功');
    connection.release();
    return true;
  } catch (error) {
    console.error('数据库连接失败:', error.message);
    return false;
  }
}

module.exports = { pool, testConnection };