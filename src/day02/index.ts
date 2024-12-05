import run from 'aocrunner'

const parseInput = (rawInput: string) => rawInput.split('\n').map(row => row.split(' ').map(Number))

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)

  const totalSafe = input.reduce((acc, row) => {
    const increase = row[0] < row[1]
    const isSafe = row.every((num, i) => {
      if (i === 0) return true
      if (increase && num < row[i - 1] || !increase && num > row[i - 1]) return false
      const diff = Math.abs(num - row[i - 1])
      return diff >= 1 && diff <= 3
    })

    return isSafe ? acc + 1 : acc
  }, 0)

  return totalSafe
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)

  const isSafe = (row: number[]) => {
    const increase = row[0] < row[1]
    return row.every((num, i) => {
      if (i === 0) return true
      if (increase && num < row[i - 1] || !increase && num > row[i - 1]) return false
      const diff = Math.abs(num - row[i - 1])
      return diff >= 1 && diff <= 3
    })
  }

  const totalSafe = input.reduce((acc, row) => {
    const safe = isSafe(row) || row.some((_, i, r) => isSafe([...r.slice(0, i), ...r.slice(i + 1)]))
    return safe ? acc + 1 : acc
  }, 0)

  return totalSafe
}

run({
  part1: {
    tests: [
      {
        input: `7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9`,
        expected: 2
      }
    ],
    solution: part1
  },
  part2: {
    tests: [
      {
        input: `7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9`,
        expected: 4
      }
    ],
    solution: part2
  },
  trimTestInputs: true,
  onlyTests: false
})
