const LINE = /(.+)/g

const fs = require('fs')
const input = fs.readFileSync('./input.txt', 'utf8')

const inputArray = input.match(LINE)

const offByOne = (str1, str2) => {
  let diff = 0

  for (let i = 0, len = str1.length; i < len; i++) {
    if (str1[i] !== str2[i]) {
      diff++

      if (diff > 1) {
        break
      }
    }
  }

  if (diff === 1) {
    return true
  }

  return false
}

const removeOffendingLetter = (str1, str2) => {
  let common

  for (let i = 0, len = str1.length; i < len; i++) {
    if (str1[i] !== str2[i]) {
      common = str1.split(str1[i]).join('')
    }
  }

  return common
}

const commonLetters = (arr) => {
  const idsOffByOne = arr.filter((hash, index, idArray) => {
    for (let i = 0, len = idArray.length; i < len; i++) {
      if (offByOne(hash, idArray[i]) === true) return true
    }
  })

  return removeOffendingLetter(idsOffByOne[0], idsOffByOne[1])
}

console.log(
  `*** Test 1 ***\nActual Result: ${commonLetters([
    'abcde',
    'fghij',
    'klmno',
    'pqrst',
    'fguij',
    'axcye',
    'wvxyz'
  ])}\nExpected Result: fgij\n`
)
console.log(`*** Final Test ***\n${commonLetters(inputArray)}\n`)
