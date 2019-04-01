const { MYSQL_CONF } = require('../conf/db')
const mysql = require('mysql')

const con = mysql.createConnection(MYSQL_CONF)

// build the connection
con.connect();

// execute the query
function exec(sql) {
    const promise = new Promise((resolve, reject) => {
        con.query(sql, (err, result) => {
            if (err) {
                reject(err)
                return
            }
            resolve(result)
        })
    })
    return promise
}

module.exports = {
    exec,
    escape: mysql.escape
}
