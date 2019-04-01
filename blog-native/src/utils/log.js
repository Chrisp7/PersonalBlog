const fs = require('fs')
const path = require('path')


// function to write log
const writeLog = (writeStream, log) => {
    writeStream.write(log + '\n')
}


// generate write stream
const createWriteStream = (fileName) => {
    const fullFileName = path.join(__dirname, '../', '../', 'logs', fileName)
    const writeStream = fs.createWriteStream(fullFileName, {
        flags: 'a'
    })
    return writeStream
}

const accessWriteStream = createWriteStream('access.log')

function access(log) {
    writeLog(accessWriteStream, log)
}

module.exports = {
    access
}