const {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog
} = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const { get, set } = require('../db/redis')

// check if logined
const loginCheck = (req) => {
    if (!req.session.username) {
        return Promise.resolve(
            new ErrorModel('have not login')
        )
    }
}

const handleBlogRouter = (req, res) => {
    const method = req.method
    const id = req.query.id || ''
    // get blog list
    if (method === 'GET' && req.path === '/api/blog/list') {
        let author = req.query.author || ''
        const keyword = req.query.keyword || ''
        if (req.query.isadmin) {
            const loginCheckResult = loginCheck(req)
            if (loginCheckResult) {
                return loginCheckResult
            }

            author = req.session.username
        }
        const result = getList(author, keyword)
        return result.then(listData => {
            return new SuccessModel(listData)
        })

    }
    // get blog detail
    if (method === 'GET' && req.path === '/api/blog/detail') {
        // const detail = getDetail(id)
        // return new SuccessModel(detail)
        const result = getDetail(id)
        return result.then(data => {
            return new SuccessModel(data)
        })

    }
    // create a new blog
    if (method === 'POST' && req.path === '/api/blog/new') {
        // check if logined
        const loginCheckResult = loginCheck(req)
        if (loginCheckResult) {
            return loginCheckResult
        }
        req.body.author = req.session.username
        const result = newBlog(req.body)
        return result.then(insertId => {
            return new SuccessModel(insertId)
        })
    }
    // update a blog
    if (method === 'POST' && req.path === '/api/blog/update') {
        // check if logined
        const loginCheckResult = loginCheck(req)
        if (loginCheckResult) {
            return loginCheckResult
        }
        const updateResult = updateBlog(id, req.body)
        return updateResult.then(updateData => {
            if (updateData) {
                return new SuccessModel('update successful')
            } else {
                return new ErrorModel('update error')
            }
        })

    }
    // delete a blog 
    if (method === 'POST' && req.path === '/api/blog/delete') {
        // check if logined
        const loginCheckResult = loginCheck(req)
        if (loginCheckResult) {
            return loginCheckResult
        }
        req.body.author = req.session.username
        const delResult = delBlog(id, req.body)
        return delResult.then(delData => {
            if (delData) {
                return new SuccessModel()
            } else {
                return new ErrorModel('delete error')
            }
        })
    }
}

module.exports = handleBlogRouter