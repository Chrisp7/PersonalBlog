const { login } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const { set, get } = require('../db/redis')

// get cookie expiration date
const getCookieExpires = () => {
    const d = new Date()
    d.setTime(d.getTime() + (24 * 60 * 60 * 1000))
    return d.toGMTString()
}

const handleUserRouter = (req, res) => {
    const method = req.method
    const url = req.url
    const path = url.split('?')[0]

    // login
    if (method === 'POST' && path === '/api/user/login') {
        const { username, password } = req.body
        const loginResult = login(username, password)
        return loginResult.then(loginData => {
            if (loginData.username) {
                req.session.username = loginData.username
                req.session.realname = loginData.realname
                console.log('third req.sessionId', req.sessionId)
                set(req.sessionId, req.session)
                return new SuccessModel()
            } else {
                return new ErrorModel('error in login')
            }
        })
    }
    // login test
    /*
    if (method === 'GET' && path === '/api/user/login-test') {
        if (req.session.username) {
            return Promise.resolve(
                new SuccessModel({
                    username: req.session.username
                })
            )
        }
        return Promise.resolve(
            new ErrorModel('login error')
        )
    }
    */

}

module.exports = handleUserRouter