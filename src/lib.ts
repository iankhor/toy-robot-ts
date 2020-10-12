const TABLE_SIZE = 5

export enum Direction {
  NORTH = 'NORTH',
  SOUTH = 'SOUTH',
  EAST = 'EAST',
  WEST = 'WEST',
}

export type Position = {
  x: number
  y: number
  direction: Direction
}

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
  const { NORTH, SOUTH, EAST, WEST } = Direction

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
