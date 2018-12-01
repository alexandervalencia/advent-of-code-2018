const LINE = /(.+)/g

const fs = require('fs')
const input = fs.readFileSync('./input.txt', 'utf8')

const inputArray = input.match(LINE)

const convertStrToNum = function (str) {
  return Number.parseInt(str, 10)
}

const loopingDevice = function (arr) {
  const frequencyNumArr = arr.map((str) => convertStrToNum(str))

  let duplicateFrequencyHit = false
  let frequency = 0
  let frequencyList = [ frequency ]
  let i = 0

  while (!duplicateFrequencyHit) {
    for (i; i < frequencyNumArr.length; i++) {
      frequency = frequency + frequencyNumArr[i]

      frequencyList.push(frequency)

      for (let j = 0; j < frequencyList.length - 1; j++) {
        if (frequency === frequencyList[j]) {
          duplicateFrequencyHit = true

          break
        }
      }

      if (duplicateFrequencyHit === true) {
        break
      }
    }

    i = 0
  }

  return frequency
}

console.log(`*** Test 1 ***\nActual Result: ${loopingDevice([ '+1', '-1' ])}\nExpected Result: 0\n`)
console.log(`*** Test 2 ***\nActual Result: ${loopingDevice([ '+3', '+3', '+4', '-2', '-4' ])}\nExpected Result: 10\n`)
console.log(`*** Test 3 ***\nActual Result: ${loopingDevice([ '-6', '+3', '+8', '+5', '-6' ])}\nExpected Result: 5\n`)
console.log(`*** Test 4 ***\nActual Result: ${loopingDevice([ '+7', '+7', '-2', '-7', '-4' ])}\nExpected Result: 14\n`)
console.log(`*** Final Test ***\n${loopingDevice(inputArray)}\n`)
