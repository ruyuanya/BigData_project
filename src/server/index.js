import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import multiparty from 'connect-multiparty'
import { conMysql } from './mysql.js'

const app = express()
app.use(cors())

// 处理 x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
// 处理 mutipart/form-data
app.use(multiparty())
// 处理 application/json
app.use(bodyParser.json())

//创建统一的返回报文对象
class Response {
    constructor(isSucceed, msg, code, data) {
        this.isSucceed = isSucceed
        this.msg = msg
        this.code = code
        this.data = data
    }
}

//一个简单的测试接口
app.get('/test', (req, res) => {
    res.send('测试用的接口')
})

// 获取所有用户的接口
app.get('/getUser', (req, res) => {
    let sql = 'SELECT * FROM user' // SQL 查询语句
    conMysql(sql).then(result => {
        let response = new Response(true, '获取成功', 200, result)
        res.send(response)
    }).catch(err => {
        let response = new Response(false, '获取失败', 500, err)
        res.status(500).send(response)
    })
})

//监听node服务器的端口号
app.listen(3000, () => {
    console.log('Server run🏃 in：http://localhost:3000')
})