//process.stdin.pipe(process.stdout)

const http = require('http')
const fs = require('fs')
const path = require('path')
/*
// reply client with a file
const server = http.createServer((req, res) => {
    if (req.method === 'GET') {
        var fileName = path.resolve(__dirname, '../file-test/data.txt')
        var stream = fs.createReadStream(fileName)
        stream.pipe(res)
    }
})

server.listen(8000)
*/

// copy files
/*
const file1 = path.resolve(__dirname, 'data.txt')
const file2 = path.resolve(__dirname, 'data-bak.txt')

const readStream = fs.createReadStream(file1)
const writeStream = fs.createWriteStream(file2)

readStream.pipe(writeStream)
readStream.on('data', chunk => {
    console.log(chunk.toString())
})
readStream.on('end', () => {
    console.log('copy done.')
})
*/