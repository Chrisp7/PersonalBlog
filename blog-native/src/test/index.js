const mysql = require('mysql')

const con = mysql.createConnection({
    host: 'localhost',
    user: 'CP',
    password: '123456',
    port: '3306',
    database: 'blog'
})

con.connect()

const sql = 'update users set realname="chris" where username = "cp"'

con.query(sql, (err, result) => {
    if (err) {
        console.log(err)
        return
    }
    console.log(result)
})

con.end()