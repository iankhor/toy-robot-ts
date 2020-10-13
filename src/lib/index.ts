import { Direction, Position, CommandInput, SanitizedCommand } from './../types'
import { move, left, right, place, validatePosition } from './../lib/moves'

const { PLACE, MOVE, LEFT, RIGHT, REPORT } = CommandInput

function executeMove(command: string, position?: Position) {
  const commands = {
    PLACE: place,
    LEFT: left,
    RIGHT: right,
    MOVE: move,
  } as Record<string, any>

  return commands[command](position)
}

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

function sanitizeCommands(rawInputCommands: string): SanitizedCommand[] {
  const commands = parseInputs(rawInputCommands.trim().toUpperCase()).map((i) => parseInput(i))
  const firstValidCommandIndex = commands.findIndex((c) => c.command === PLACE)

  return commands.slice(firstValidCommandIndex)
}

function buildOutput(commands: SanitizedCommand[]): Position[] {
  let currentPosition = {} as Position

  return commands
    .map((i): null | Position => {
      switch (i.command) {
        case PLACE:
          currentPosition = executeMove(i.command, i.position as Position)
          return null
        case MOVE:
        case LEFT:
        case RIGHT:
          currentPosition = executeMove(i.command, currentPosition)
          return null
        case REPORT:
          return currentPosition
        default:
          return null
      }
    })
    .filter(Boolean) as Position[]
}

function isValidCommand({ command, position }: SanitizedCommand): Boolean {
  const validPlace = command === PLACE && position && validatePosition(position.x, position.y, position.direction)
  const validMove = command === MOVE
  const validLeft = command === LEFT
  const validRight = command === RIGHT
  const validReport = command === REPORT

  return validPlace || validMove || validLeft || validRight || validReport
}

export function run(rawInputCommands: string): Position[] {
  const commands = sanitizeCommands(rawInputCommands)
  const hasPlaceCommand = commands.some((c) => c.command === PLACE)

  return hasPlaceCommand ? buildOutput(commands) : []
}

export function validateInput(rawInputCommands: string): Boolean {
  const commands = sanitizeCommands(rawInputCommands)

  return commands.every((c) => isValidCommand(c))
}

export { left, right, move, place }
