const fs = require('fs')
const path = require('path')
const readline = require('readline')

// filename
const fullFileName = path.join(__dirname, '../', '../', 'logs', 'access.log')

// create read stream
const readStream = fs.createReadStream(fullFileName)

// create readline object
const rl = readline.createInterface({
    input: readStream
})

let chromeNum = 0
let sum = 0

// read line by line
rl.on('line', (lineData) => {
    if (!lineData) {
        return
    }
    sum++
    const arr = lineData.split(' -- ')
    if (arr[2] && arr[2].indexOf('Chrome') > 0) {
        chromeNum++
    }
})

rl.on('close', () => {
    console.log(chromeNum, sum)
    console.log('chrome accounts for: ', chromeNum / sum)
})
