const LINE = /(.+)/g

const fs = require('fs')
const input = fs.readFileSync('./input.txt', 'utf8')

const convertStrToNum = function (str) {
  return Number.parseInt(str, 10)
}

const sumArray = function (array) {
  return array.reduce((a, b) => a + b)
}

const lineArray = input.match(LINE)

const numberArray = lineArray.map((str) => convertStrToNum(str))

console.log(sumArray(numberArray))
