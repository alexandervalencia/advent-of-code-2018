const LINE = /(.+)/g

const fs = require('fs')
const input = fs.readFileSync('./input-example.txt', 'utf8')

const inputArray = input.match(LINE)

const polymers = inputArray[0].split('')

const noSameUnits = function (units) {
  for (let i = 0; i < units.length - 1; i++) {
    let first = units[i]
    let second = units[i + 1]

    let firstCase = first === first.toUpperCase() ? 'upper' : 'lower'
    let secondCase = second === second.toUpperCase() ? 'upper' : 'lower'

    if (firstCase !== secondCase && first.toLowerCase() === second.toLowerCase()) {
      console.log(JSON.stringify(units))
      console.log(`Removing Pair: ${first}${second}
`)
      units.splice(i, 2)

      i = i - 2
    }
  }

  return units
}

const cleanPolymer = noSameUnits(polymers)

const cleanUnits = cleanPolymer.length

console.log(`Cleaned Polymer: ${cleanPolymer.join('')}`) // Cleaned Polymer: dabCBAcaDA
console.log(`Number of units in Polymer: ${cleanUnits}`) // Number of units in Polymer: 10
