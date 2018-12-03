const fs = require('fs')
const input = fs.readFileSync('./input.txt', 'utf8')

const LINE = /(.+)/g

const inputArray = input.match(LINE)

// console.log(`*** Test 1 ***\nActual Result: ${}\nExpected Result: \n`)

// console.log(`*** Final Test ***\n${}\n`)
