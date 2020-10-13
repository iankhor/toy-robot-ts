import { Position, CommandInput, SanitizedCommand } from './../types'
import { move, left, right, place } from './../lib/moves'
import { validateInput, sanitizeCommands } from './../lib/inputValidation'

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

export function run(rawInputCommands: string): Position[] {
  const commands = sanitizeCommands(rawInputCommands)
  const hasPlaceCommand = commands.some((c) => c.command === PLACE)

  return hasPlaceCommand ? buildOutput(commands) : []
}

export { left, right, move, place, validateInput }
