const env = process.env.NODE_ENV

let MYSQL_CONF
let REDIS_CONF

if (env === 'dev') {
    // MYSQL
    MYSQL_CONF = {
        host: 'localhost',
        user: 'CP',
        password: '123456',
        port: '3306',
        database: 'blog'
    }
    // REDIS
    REDIS_CONF = {
        port: 6379,
        host: '127.0.0.1'
    }
}

if (env === 'product') {
    // MYSQL
    MYSQL_CONF = {
        host: 'localhost',
        user: 'CP',
        password: '123456',
        port: '3306',
        database: 'blog'
    }

    // REDIS
    REDIS_CONF = {
        port: 6379,
        host: '127.0.0.1'
    }
}

module.exports = {
    MYSQL_CONF,
    REDIS_CONF
}