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
  switch (command) {
    case PLACE:
      return !!position && validatePosition(position.x, position.y, position.direction)
    case MOVE:
      return true
    case LEFT:
      return true
    case RIGHT:
      return true
    case REPORT:
      return true
    default:
      return false
  }
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
