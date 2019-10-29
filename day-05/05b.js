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

      if (i > 0) {
        i = i - 2
      } else {
        i = i - 1
      }
    }
  }

  return units
}

function filterOutUnits (unit, polymer) {
  const filtered = {}
  const cleanPolymer = polymer.filter((currentUnit) => currentUnit.toLowerCase() !== unit.toLowerCase())

  filtered.filter = unit
  filtered.cleanPolymer = noSameUnits(cleanPolymer)
  filtered.size = filtered.cleanPolymer.length

  return filtered // {filter: 'a', cleanPolymer: ['K', 'f', 'R', ...], size: 9300}
}

const filteredPolymers = alphabet.map((ltr) => filterOutUnits(ltr, polymers))

const reducedPolymers = filteredPolymers.reduce((prev, curr) => (prev.size < curr.size ? prev : curr))

console.log(`*** Day 5 Answer: ***
Unit Removed: ${reducedPolymers.filter}
Size of Reduced Polymer: ${reducedPolymers.size}`)
