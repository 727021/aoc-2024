import run from 'aocrunner'

const parseInput = (rawInput: string) => rawInput.split('\n').map(row => row.split(''))

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)

  let count = 0

  for (let y = 0; y < input.length; ++y) {
    const row = input[y]
    for (let x = 0; x < row.length; ++x) {
      const char = row[x]
      if (char !== 'X') {
        continue
      }
      // left to right
      if (x < row.length - 3 && row[x + 1] === 'M' && row[x + 2] === 'A' && row[x + 3] === 'S') {
        ++count
      }
      // right to left
      if (x > 2 && row[x - 1] === 'M' && row[x - 2] === 'A' && row[x - 3] === 'S') {
        ++count
      }
      // top to bottom
      if (y < input.length - 3 && input[y + 1][x] === 'M' && input[y + 2][x] === 'A' && input[y + 3][x] === 'S') {
        ++count
      }
      // bottom to top
      if (y > 2 && input[y - 1][x] === 'M' && input[y - 2][x] === 'A' && input[y - 3][x] === 'S') {
        ++count
      }
      // top left to bottom right
      if (x < row.length - 3 && y < input.length - 3 && input[y + 1][x + 1] === 'M' && input[y + 2][x + 2] === 'A' && input[y + 3][x + 3] === 'S') {
        ++count
      }
      // bottom left to top right
      if (x < row.length - 3 && y > 2 && input[y - 1][x + 1] === 'M' && input[y - 2][x + 2] === 'A' && input[y - 3][x + 3] === 'S') {
        ++count
      }
      // bottom right to top left
      if (x > 2 && y > 2 && input[y - 1][x - 1] === 'M' && input[y - 2][x - 2] === 'A' && input[y - 3][x - 3] === 'S') {
        ++count
      }
      // top right to bottom left
      if (x > 2 && y < input.length - 3 && input[y + 1][x - 1] === 'M' && input[y + 2][x - 2] === 'A' && input[y + 3][x - 3] === 'S') {
        ++count
      }
    }
  }

  return count
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)

  let count = 0

  for (let y = 1; y < input.length - 1; ++y) {
    const row = input[y]
    for (let x = 1; x < row.length - 1; ++x) {
      const char = row[x]
      if (char !== 'A') {
        continue
      }
      let checkS: 'top'|'right'|'bottom'|'left'|null = null
      if (input[y - 1][x - 1] === 'M' && input[y - 1][x + 1] === 'M') {
        checkS = 'top'
      } else if (input[y + 1][x - 1] === 'M' && input[y + 1][x + 1] === 'M') {
        checkS = 'bottom'
      } else if (input[y - 1][x - 1] === 'M' && input[y + 1][x - 1] === 'M') {
        checkS = 'left'
      } else if (input[y - 1][x + 1] === 'M' && input[y + 1][x + 1] === 'M') {
        checkS = 'right'
      }
      switch (checkS) {
        case 'top':
          if (input[y + 1][x - 1] === 'S' && input[y + 1][x + 1] === 'S') {
            ++count
          }
          break
        case 'bottom':
          if (input[y - 1][x - 1] === 'S' && input[y - 1][x + 1] === 'S') {
            ++count
          }
          break
        case 'left':
          if (input[y - 1][x + 1] === 'S' && input[y + 1][x + 1] === 'S') {
            ++count
          }
          break
        case 'right':
          if (input[y - 1][x - 1] === 'S' && input[y + 1][x - 1] === 'S') {
            ++count
          }
          break
      }
    }
  }

  return count
}

run({
  part1: {
    tests: [
      {
        input: `MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX`,
        expected: 18
      }
    ],
    solution: part1
  },
  part2: {
    tests: [
      {
        input: `MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX`,
        expected: 9
      }
    ],
    solution: part2
  },
  trimTestInputs: true,
  onlyTests: false
})
