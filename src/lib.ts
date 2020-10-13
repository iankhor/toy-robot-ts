const TABLE_SIZE = 5

export enum Direction {
  NORTH = 'NORTH',
  SOUTH = 'SOUTH',
  EAST = 'EAST',
  WEST = 'WEST',
}

type CommandInput = 'PLACE' | 'MOVE' | 'LEFT' | 'RIGHT' | 'REPORT'

export type Position = {
  x: number
  y: number
  direction: Direction
}

type SanitizedCommand = {
  command: string
  position?: Position
}

const { NORTH, SOUTH, EAST, WEST } = Direction

function isValidCoordinate(coord: number): Boolean {
  return coord >= 0 && coord <= TABLE_SIZE
}

function isValidDirection(direction?: Direction) {
  return direction && Object.keys(Direction).includes(direction)
}

function validatePosition(x: number, y: number, direction: Direction) {
  return isValidCoordinate(x) && isValidCoordinate(y) && isValidDirection(direction)
}

function forward(coordinate: number) {
  return isValidCoordinate(coordinate + 1) ? coordinate + 1 : coordinate
}

function backward(coordinate: number) {
  return isValidCoordinate(coordinate - 1) ? coordinate - 1 : coordinate
}

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
  const firstValidCommandIndex = commands.findIndex((c) => c.command === 'PLACE')

  return commands.slice(firstValidCommandIndex)
}

function buildOutput(commands: SanitizedCommand[]): Position[] {
  let currentPosition = {} as Position

  return commands
    .map((i): null | Position => {
      switch (i.command) {
        case 'PLACE':
          currentPosition = executeMove(i.command, i.position as Position)
          return null
        case 'MOVE':
        case 'LEFT':
        case 'RIGHT':
          currentPosition = executeMove(i.command, currentPosition)
          return null
        case 'REPORT':
          return currentPosition
        default:
          return null
      }
    })
    .filter(Boolean) as Position[]
}

function isValidCommand({ command, position }: SanitizedCommand): Boolean {
  const validPlace = command === 'PLACE' && position && validatePosition(position.x, position.y, position.direction)
  const validMove = command === 'MOVE'
  const validLeft = command === 'LEFT'
  const validRight = command === 'RIGHT'
  const validReport = command === 'REPORT'

  return validPlace || validMove || validLeft || validRight || validReport
}

export function place({ x, y, direction }: Position = { x: 0, y: 0, direction: Direction.NORTH }) {
  if (validatePosition(x, y, direction)) {
    return {
      x,
      y,
      direction,
    }
  } else {
    throw new Error('invalid position')
  }
}

export function move(position: Position) {
  const { x, y, direction } = position

  switch (direction) {
    case NORTH:
      return { ...position, y: forward(y) }
    case SOUTH:
      return { ...position, y: backward(y) }
    case EAST:
      return { ...position, x: forward(x) }
    case WEST:
      return { ...position, x: backward(x) }
    default:
      throw new Error('invalid direction')
  }
}

export function left(position: Position) {
  const { direction, ...coordinates } = position

  switch (direction) {
    case NORTH:
      return { ...coordinates, direction: WEST }
    case SOUTH:
      return { ...coordinates, direction: EAST }
    case EAST:
      return { ...coordinates, direction: NORTH }
    case WEST:
      return { ...coordinates, direction: SOUTH }
    default:
      throw new Error('invalid direction')
  }
}

export function right(position: Position) {
  const { direction, ...coordinates } = position

  switch (direction) {
    case NORTH:
      return { ...coordinates, direction: EAST }
    case SOUTH:
      return { ...coordinates, direction: WEST }
    case EAST:
      return { ...coordinates, direction: SOUTH }
    case WEST:
      return { ...coordinates, direction: NORTH }
    default:
      throw new Error('invalid direction')
  }
}

export function run(rawInputCommands: string): Position[] {
  const commands = sanitizeCommands(rawInputCommands)
  const hasPlaceCommand = commands.some((c) => c.command === 'PLACE')

  return hasPlaceCommand ? buildOutput(commands) : []
}

export function validateInput(rawInputCommands: string): Boolean {
  const commands = sanitizeCommands(rawInputCommands)

  return commands.every((c) => isValidCommand(c))
}
