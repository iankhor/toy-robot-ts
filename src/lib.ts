const TABLE_SIZE = 5

export enum Direction {
  NORTH = 'NORTH',
  SOUTH = 'SOUTH',
  EAST = 'EAST',
  WEST = 'WEST',
}

type CommandInput = 'PLACE' | 'MOVE'

export type Position = {
  x: number
  y: number
  direction: Direction
}

const { NORTH, SOUTH, EAST, WEST } = Direction

function isValidCoordinate(coord: number) {
  return coord >= 0 && coord <= TABLE_SIZE
}

function isValidDirection(direction: Direction) {
  return Object.keys(Direction).includes(direction)
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

function parseInput(input: string) {
  const [command, rawArgs] = input.split(' ')

  if (command === 'PLACE') {
    const [x, y, direction] = rawArgs.split(',')

    return { command, position: { x: parseInt(x), y: parseInt(y), direction } }
  } else {
    return { command }
  }
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

export function run(inputs: string[]) {
  let currentPosition = {} as Position

  inputs.forEach((i) => {
    const { command, position } = parseInput(i)

    switch (command) {
      case 'PLACE':
        currentPosition = executeMove(command, position as Position)
        break
      case 'MOVE':
      case 'LEFT':
      case 'RIGHT':
        currentPosition = executeMove(command, currentPosition)
    }
  })

  return inputs.includes('REPORT') ? currentPosition : {}
}
