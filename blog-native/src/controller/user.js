const { exec, escape } = require('../db/mysql')
const { genPasswd } = require('../utils/cryp')

const login = (username, passwd) => {
    username = escape(username)
    passwd = genPasswd(passwd)
    passwd = escape(passwd)
    const sql = `
        select username ,realname from users where username =${username} and passwd = ${passwd}
    `
    return exec(sql).then(rows => {
        return rows[0] || {}
    })
}

module.exports = {
    login
}