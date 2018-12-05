const fs = require('fs')
const input = fs.readFileSync('./input.txt', 'utf8')

const LINE = /(.+)/g
const FABRIC_DATA = /(\d{1,4})/g
const FABRIC_LENGTH = 1000

const inputArray = input.match(LINE)

const matched = inputArray.map((line) => line.match(FABRIC_DATA))

const checkForOverlap = (arr) => {
  return arr.filter((n) => n >= 2)
}

const fabricMaker = (length) => {
  const fabric = new Array(length)

  for (let i = 0; i < length; i++) {
    fabric[i] = new Array(length).fill(0, 0, length)
  }

  return fabric
}

const mapArraysToConfigs = (arrayOfArrays) => {
  const mappedArrays = arrayOfArrays.map((arr) => {
    const config = {}

    config.id = arr[0]
    config.x = arr[2]
    config.y = arr[1]
    config.xCount = arr[4]
    config.yCount = arr[3]

    return config
  })

  return mappedArrays
}

const overlappingCounter = (fabric, config) => {
  let y = config.y
  let yCount = config.yCount
  let xCount = config.xCount

  for (let i = 0; i < yCount; i++) {
    let x = config.x

    for (let j = 0; j < xCount; j++) {
      fabric[y][x]++
      x++
    }

    y++
  }

  return fabric
}

const prototypeFabric = fabricMaker(FABRIC_LENGTH)

const arrayOfConfigs = mapArraysToConfigs(matched)

arrayOfConfigs.forEach((config) => overlappingCounter(prototypeFabric, config))

const cutFabric = prototypeFabric.map((arr) => checkForOverlap(arr)).filter((arr) => arr.length > 0)

const overlappedFabric = [].concat.apply([], cutFabric).length

console.log(`*** Final Answer ***
${overlappedFabric}
`)
