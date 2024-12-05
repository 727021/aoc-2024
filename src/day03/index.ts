import run from 'aocrunner'

const parseInput = (rawInput: string) => rawInput

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)

  const regex = /mul\(\d{1,3},\d{1,3}\)/g

  const matches = input.match(regex) ?? []
  
  const total = matches.reduce((acc, match) => {
    const [a, b] = match.slice(4, -1).split(',')
    return acc + +a * +b
  }, 0)

  return total
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)

  const regex = /mul\(\d{1,3},\d{1,3}\)|do\(\)|don't\(\)/g

  const matches = input.match(regex) ?? []

  let canMul = true
  let total = 0

  for (const instruction of matches) {
    switch (instruction) {
      case 'do()':
        canMul = true
        break
      case "don't()":
        canMul = false
        break
      default:
        if (canMul) {
          const [a, b] = instruction.slice(4, -1).split(',')
          total += +a * +b
        }
    }
  }

  return total
}

run({
  part1: {
    tests: [
      {
        input: `xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))`,
        expected: 161
      }
    ],
    solution: part1
  },
  part2: {
    tests: [
      {
        input: `xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))`,
        expected: 48
      }
    ],
    solution: part2
  },
  trimTestInputs: true,
  onlyTests: false
})
