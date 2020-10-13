import { Direction, Position } from './../types'

const TABLE_SIZE = 5
const { NORTH, SOUTH, EAST, WEST } = Direction

function forward(coordinate: number) {
  return isValidCoordinate(coordinate + 1) ? coordinate + 1 : coordinate
}

function backward(coordinate: number) {
  return isValidCoordinate(coordinate - 1) ? coordinate - 1 : coordinate
}

function isValidDirection(direction?: Direction) {
  return direction && Object.keys(Direction).includes(direction)
}

function isValidCoordinate(coord: number): Boolean {
  return coord >= 0 && coord <= TABLE_SIZE
}

export function validatePosition(x: number, y: number, direction: Direction) {
  return isValidCoordinate(x) && isValidCoordinate(y) && isValidDirection(direction)
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
