const mysql = require('mysql')

//创建连接对象
const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    port: '3306',
    database: 'myblog'
})

//开始连接
con.connect()

//执行sql语句
const sql = "INSERT INTO blogs (title, content, createtime, author) VALUES ('标题c', '内容c', 1576119807966, 'chen');"
con.query(sql, (err, result) => {
    if (err) {
        console.err(err)
        return
    }
    console.log(result)
})

//关闭连接
con.end()