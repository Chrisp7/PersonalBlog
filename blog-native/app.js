const handleBlogRouter = require('./src/router/blog.js')
const handleUserRouter = require('./src/router/user.js')
const querystring = require('querystring')
const { get, set } = require('./src/db/redis')
const { access } = require('./src/utils/log')

// session data
//SESSION_DATA = {}

const getCookieExpires = () => {
    const d = new Date()
    d.setTime(d.getTime() + (24 * 60 * 60 * 1000))
    return d.toGMTString()
}

const getPostData = (req) => {
    const promise = new Promise((resolve, reject) => {
        if (req.method === 'GET') {
            resolve({})
            return
        }
        if (req.headers['content-type'] !== 'application/json') {
            resolve({})
            return
        }
        let postData = ''
        req.on('data', chunk => {
            postData += chunk.toString()
        })
        req.on('end', () => {
            if (!postData) {
                resolve({})
                return
            }
            resolve(
                JSON.parse(postData)
            )
        })
    })
    return promise
}

const serverHandle = (req, res) => {
    // log
    access(`${req.method} -- ${req.url} -- ${req.headers['user-agent']} -- ${Date.now()}`)
    // set response type
    res.setHeader('content-type', 'application/json')
    // get the url
    const url = req.url
    req.path = url.split('?')[0]

    // get the query
    req.query = querystring.parse(url.split('?')[1])

    //get cookie
    req.cookie = {}
    const cookieStr = req.headers.cookie || ''
    cookieStr.split(';').forEach(item => {
        if (!item) {
            return
        }
        const arr = item.split('=')
        const key = arr[0].trim()
        const val = arr[1].trim()
        req.cookie[key] = val
    })

    // resolve session
    let needSetCookie = false
    let userId = req.cookie.userId
    if (!userId) {
        needSetCookie = true
        userId = `${Date.now()}_${Math.random()}`
        set(userId, {})
    }
    req.sessionId = userId
    get(req.sessionId).then(sessionData => {
        if (sessionData == null) {
            console.log('second req.sessionId', req.sessionId)
            set(req.sessionId, {})
            req.session = {}
        } else {
            req.session = sessionData
        }
        return getPostData(req)
    }).then(postData => {
        req.body = postData
        const blogResult = handleBlogRouter(req, res)
        if (blogResult) {
            blogResult.then(blogData => {
                if (needSetCookie) {
                    res.setHeader('Set-Cookie', `userId=${userId};path=/;httpOnly; expires = ${getCookieExpires()}`)
                }
                res.end(
                    JSON.stringify(blogData)
                )
            })
            return
        }
        const loginResult = handleUserRouter(req, res)
        if (loginResult) {
            loginResult.then(loginData => {
                if (needSetCookie) {
                    res.setHeader('Set-Cookie', `userId=${userId};path=/;httpOnly; expires = ${getCookieExpires()}`)
                }
                res.end(
                    JSON.stringify(loginData)
                )
            })

            return
        }
        res.writeHead(404, { 'Content-type': 'text/plain' })
        res.write('404 Not Found\n')
        res.end()
    })

}

module.exports = serverHandle