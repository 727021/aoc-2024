import run from 'aocrunner'

const parseInput = (rawInput: string) => rawInput.split('\n').reduce((acc, line) => {
  const [x, y] = line.split('   ').map(Number)
  acc.left.push(x)
  acc.right.push(y)
  return acc
}, { left: [], right: [] } as { left: number[]; right: number[] })

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)

  input.left.sort((a, b) => a - b)
  input.right.sort((a, b) => a - b)

  const total = input.left.reduce((acc, x, i) => {
    return acc + Math.abs(x - input.right[i])
  }, 0)

  return  total
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)

  input.left.sort((a, b) => a - b)
  input.right.sort((a, b) => a - b)

  const found = new Map<number, number>()

  const total = input.left.reduce((acc, x) => {
    if (!found.has(x)) {
      let timesInRight = 0
      for (const y of input.right) {
        if (y === x) {
          ++timesInRight
        }
        if (y > x) {
          break
        }
      }
      found.set(x, x * timesInRight)
    }
    return acc + found.get(x)!
  }, 0)

  return total
}

run({
  part1: {
    tests: [
      {
        input: `3   4
4   3
2   5
1   3
3   9
3   3`,
        expected: 11
      }
    ],
    solution: part1
  },
  part2: {
    tests: [
      {
        input: `3   4
4   3
2   5
1   3
3   9
3   3`,
        expected: 31
      }
    ],
    solution: part2
  },
  trimTestInputs: true,
  onlyTests: false
})
