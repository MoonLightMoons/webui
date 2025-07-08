const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();
const port = 3000;

// 启用CORS
app.use(cors());
// 解析JSON请求体
app.use(express.json());

// 创建数据库连接
const db = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root', // 默认用户名，实际使用时请修改
  password: '122334', // 默认密码为空，实际使用时请修改
  database: 'webui' // 数据库名称
});

// 连接数据库
db.connect((err) => {
  if (err) {
    console.error('数据库连接失败:', err);
    return;
  }
  console.log('数据库连接成功');

  // 创建留言表（如果不存在）
  const createTableSQL = `
    CREATE TABLE IF NOT EXISTS messages (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(50) NOT NULL,
      email VARCHAR(100) NOT NULL,
      message TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  db.query(createTableSQL, (err) => {
    if (err) {
      console.error('创建表失败:', err);
    } else {
      console.log('留言表准备就绪');
    }
  });
});

// 获取所有留言
app.get('/api/messages', (req, res) => {
  db.query('SELECT * FROM messages ORDER BY created_at DESC', (err, results) => {
    if (err) {
      res.status(500).json({ error: '获取留言失败' });
      return;
    }
    res.json(results);
  });
});

// 添加新留言
app.post('/api/messages', (req, res) => {
  const { name, email, message } = req.body;
  const sql = 'INSERT INTO messages (name, email, message) VALUES (?, ?, ?)';

  db.query(sql, [name, email, message], (err, result) => {
    if (err) {
      res.status(500).json({ error: '发送留言失败' });
      return;
    }
    res.json({ id: result.insertId, message: '留言发送成功' });
  });
});

// 启动服务器
app.listen(port, () => {
  console.log(`服务器运行在 http://localhost:${port}`);
});