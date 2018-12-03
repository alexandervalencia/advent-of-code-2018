const fs = require('fs')
const input = fs.readFileSync('./input.txt', 'utf8')

const LINE = /(.+)/g

const inputArray = input.match(LINE)

const appearsTwiceOrThrice = (str) => {
  const hash = {}

  let thrice = false
  let twice = false

  for (let i = 0, len = str.length; i < len; ++i) {
    if (!hash[str[i]]) {
      hash[str[i]] = 0
    }

    ++hash[str[i]]
  }

  for (const prop in hash) {
    if (hash[prop] === 2) {
      twice = true
    } else if (hash[prop] === 3) {
      thrice = true
    }
  }

  return [ twice, thrice ]
}

const checksum = (arr) => {
  const boolMap = arr.map((str) => appearsTwiceOrThrice(str))
  const twice = boolMap.filter((boolArr) => boolArr[0] === true).length
  const thrice = boolMap.filter((boolArr) => boolArr[1] === true).length

  return twice * thrice
}

// console.log(`*** Test 1: abcdef ***\nActual Result: ${appearsTwiceOrThrice('abcdef')}\nExpected Result: false, false\n`)
// console.log(`*** Test 2: bababc ***\nActual Result: ${appearsTwiceOrThrice('bababc')}\nExpected Result: true, true\n`)
// console.log(`*** Test 3: abbcde ***\nActual Result: ${appearsTwiceOrThrice('abbcde')}\nExpected Result: true, false\n`)
// console.log(`*** Test 4: abcccd ***\nActual Result: ${appearsTwiceOrThrice('abcccd')}\nExpected Result: false, true\n`)
// console.log(`*** Test 5: aabcdd ***\nActual Result: ${appearsTwiceOrThrice('aabcdd')}\nExpected Result: true, false\n`)
// console.log(`*** Test 6: abcdee ***\nActual Result: ${appearsTwiceOrThrice('abcdee')}\nExpected Result: true, false\n`)
// console.log(`*** Test 7: ababab ***\nActual Result: ${appearsTwiceOrThrice('ababab')}\nExpected Result: false, true\n`)
// console.log(
//   `*** Test 8 ***\nActual Result: ${checksum([
//     'abcdef',
//     'bababc',
//     'abbcde',
//     'abcccd',
//     'aabcdd',
//     'abcdee',
//     'ababab'
//   ])}\nExpected Result: 12\n`
// )
console.log(`*** Final Test ***\n${checksum(inputArray)}\n`)
