const express = require('express');
const router = express.Router();
const { pool } = require('../config/database');

//获取所有图书
router.route("/").get((req, res) => {
    postmysql(req, res, "getBooks");
});

//添加图书
router.route("/").post((req, res) => {
    postmysql(req, res, "addBook");
});

//更新图书
router.route("/:id").put((req, res) => {
    postmysql(req, res, "updateBook");
});

//删除图书
router.route("/:id").delete((req, res) => {
    postmysql(req, res, "deleteBook");
});

// 添加postmysql函数定义
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