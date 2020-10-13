import { Direction, SanitizedCommand, CommandInput } from './../types'
import { validatePosition } from './../lib/moves'

const { PLACE, MOVE, LEFT, RIGHT, REPORT } = CommandInput

function parseInputs(inputs: string) {
  return inputs.split('\n')
}

function parseInput(input: string): SanitizedCommand {
  const [command, rawArgs] = input.split(' ')
  const hasArgs = !!rawArgs?.length

  if (command === 'PLACE' && hasArgs) {
    const [x, y, direction] = rawArgs.split(',')

    return { command, position: { x: parseInt(x), y: parseInt(y), direction: direction as Direction } }
  } else {
    return { command }
  }
}

function isValidCommand({ command, position }: SanitizedCommand): Boolean {
  const validPlace = command === PLACE && position && validatePosition(position.x, position.y, position.direction)
  const validMove = command === MOVE
  const validLeft = command === LEFT
  const validRight = command === RIGHT
  const validReport = command === REPORT

  return validPlace || validMove || validLeft || validRight || validReport
}

export function sanitizeCommands(rawInputCommands: string): SanitizedCommand[] {
  const commands = parseInputs(rawInputCommands.trim().toUpperCase()).map((i) => parseInput(i))
  const firstValidCommandIndex = commands.findIndex((c) => c.command === PLACE)

  return commands.slice(firstValidCommandIndex)
}

export function validateInput(rawInputCommands: string): Boolean {
  const commands = sanitizeCommands(rawInputCommands)

  return commands.every((c) => isValidCommand(c))
}
