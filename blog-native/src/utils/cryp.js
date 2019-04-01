const crypto = require('crypto')

// 密匙
const SECRET_KEY = 'WJiol_8776'

// md5 crypto
function md5(content) {
    let md5 = crypto.createHash('md5')
    return md5.update(content).digest('hex')
}

// crypto function
function genPasswd(passwd) {
    let str = `password=${passwd}&key=${SECRET_KEY}`
    return md5(str)
}

module.exports = {
    genPasswd
}