const LINE = /(.+)/g

const fs = require('fs')
const input = fs.readFileSync('./input.txt', 'utf8')

const inputArray = input.match(LINE)

const polymers = inputArray[0].split('')

const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('')

function noSameUnits (units) {
  for (let i = 0; i < units.length - 1; i++) {
    let first = units[i]
    let second = units[i + 1]

    let firstCase = first === first.toUpperCase() ? 'upper' : 'lower'
    let secondCase = second === second.toUpperCase() ? 'upper' : 'lower'

    if (firstCase !== secondCase && first.toLowerCase() === second.toLowerCase()) {
      units.splice(i, 2)

      i = i - 2
    }
  }

  return units
}

function filterOutUnits (unit, polymer) {
  const filtered = {}

  filtered.filter = unit
  filtered.cleanPolymer = polymer.filter((currentUnit) => currentUnit.toLowerCase() !== unit.toLowerCase())

  return filtered
}

console.log(alphabet.map((ltr) => filterOutUnits(ltr, polymers)))

const cleanPolymer = noSameUnits(polymers)

const cleanUnits = cleanPolymer.length

// console.log(`Cleaned Polymer: ${cleanPolymer.join('')}`)
console.log(`Number of units in Polymer: ${cleanUnits}`)
