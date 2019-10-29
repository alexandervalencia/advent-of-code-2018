const LINE = /(.+)/g

const fs = require('fs')
const input = fs.readFileSync('./input-example.txt', 'utf8')

const inputArray = input.match(LINE)

console.log(inputArray)

// console.log(`*** Test 1 ***

// Expected Result:
// Guard ID: #10
// Most often minute asleep: 24
// Multiplied (ID * Minute): 240
//
// Actual Result:
// `)

// console.log(`
// *** Final Test ***

// `)
