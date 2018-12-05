const FABRIC_DATA = /(\d{1,4})/g

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

const findPristineId = (fabric, config) => {
  let y = config.y
  let yCount = config.yCount
  let xCount = config.xCount

  config.overlaps = false

  for (let i = 0; i < yCount; i++) {
    let x = config.x

    for (let j = 0; j < xCount; j++) {
      if (fabric[y][x] > 1) {
        config.overlaps = true

        break
      }

      x++
    }

    y++
  }

  if (!config.overlaps) {
    return config.id
  }

  return null
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

// Example seems to be working fine
const FABRIC_LENGTH = 8

const matched = [ '#2 @ 1,3: 4x4', '#1 @ 3,1: 4x4', '#3 @ 5,5: 2x2' ].map((line) => line.match(FABRIC_DATA))

const prototypeFabric = fabricMaker(FABRIC_LENGTH)

const configArray = mapArraysToConfigs(matched)

configArray.forEach((config) => overlappingCounter(prototypeFabric, config))

const cutFabric = prototypeFabric.map((arr) => checkForOverlap(arr)).filter((arr) => arr.length > 0)

const overlappedFabric = [].concat.apply([], cutFabric).length

console.log(
  `Expected results using example from web:
........
...2222.
...2222.
.11XX22.
.11XX22.
.111133.
.111133.
........

Actual Results:
`,
  prototypeFabric
)

console.log(`
*** Final Answer - Part 1 ***
${overlappedFabric}
`)

/**
 * Part Two
 */

const pristineFabricId = configArray
  .map((config) => findPristineId(prototypeFabric, config))
  .filter((id) => id != null)
  .pop()

console.log(`*** Final Answer = Part 2 ***
${pristineFabricId}`)
