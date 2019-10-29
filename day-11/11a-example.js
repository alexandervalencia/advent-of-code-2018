const FUEL_CELL_SIZE = 3
const GRID_SERIAL_NUMBER = 42
const GRID_SIZE = 300
const HUNDREDS_PLACE = /\d*(\d{1})\d{2}$/

const grid = buildGrid(GRID_SIZE)

const poweredGrid = grid.map((arr, i) => {
  let buffer = []

  for (let j = 0; j < grid.length; j++) {
    if (i < GRID_SIZE - FUEL_CELL_SIZE && j < GRID_SIZE - FUEL_CELL_SIZE) {
      buffer.push(find3x3PowerLevel(i, j, grid))
    } else {
      buffer.push({ x: j + 1, y: i + 1, powerLevel: 0 })
    }
  }

  return buffer
})

const powersArray = flatten(poweredGrid)

const greatestPower = powersArray.reduce((prev, curr) => (prev.powerLevel > curr.powerLevel ? prev : curr))

function buildGrid (gridSize) {
  const grid = []

  for (let y = 0; y < gridSize; y++) {
    grid[y] = []

    for (let x = 0; x < gridSize; x++) {
      grid[y][x] = assignPowerLevel(x, y, GRID_SERIAL_NUMBER)
    }
  }

  return grid
}

function assignPowerLevel (x, y, serial) {
  x++
  y++

  const rackID = x + 10

  let powerLevel = rackID * y
  powerLevel += serial
  powerLevel *= rackID

  let hundreds = 0
  let h = HUNDREDS_PLACE.exec(powerLevel)

  if (h !== null) {
    hundreds = parseInt(h[1], 10)
  }

  powerLevel = hundreds - 5

  return powerLevel
}

function find3x3PowerLevel (x, y, grid) {
  const fuelCell = {}

  fuelCell.x = x
  fuelCell.y = y

  const threeByThree = []
  const X = x

  for (let i = 0; i < 3; i++) {
    threeByThree[i] = []

    for (let j = 0; j < 3; j++) {
      threeByThree[i][j] = grid[y][x]
      x++
    }
    y++
    x = X
  }

  fuelCell.powerLevel = flatten(threeByThree).reduce((acc, res) => acc + res)

  return fuelCell
}

function flatten (arr) {
  return arr.reduce(function (flat, toFlatten) {
    return flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten)
  }, [])
}

console.log(`*** Test 1 ***
Expected Result: 4
Actual Result: ${assignPowerLevel(3 - 1, 5 - 1, 8)}
`)

console.log(`*** Test 2 ***
Expected Result: -5
Actual Result: ${assignPowerLevel(122 - 1, 79 - 1, 57)}
`)

console.log(`*** Test 3 ***
Expected Result: 0
Actual Result: ${assignPowerLevel(217 - 1, 196 - 1, 39)}
`)

console.log(`*** Test 4 ***
Expected Result: 4
Actual Result: ${assignPowerLevel(101 - 1, 153 - 1, 71)}
`)

console.log(`
*** Final Test ***
(X, Y): (${greatestPower.x}, ${greatestPower.y})
Power Level: ${greatestPower.powerLevel}
`)
