import { place, move, left, right, run, Position, Direction } from './lib'

const { NORTH, SOUTH, EAST, WEST } = Direction

describe('place', () => {
  describe('no initial position given supplied', () => {
    it('returns a default position', () => {
      expect(place()).toMatchObject({
        x: 0,
        y: 0,
        direction: NORTH,
      })
    })
  })

  describe('given an initial position', () => {
    it('returns the intial position', () => {
      const position = {
        x: 3,
        y: 4,
        direction: SOUTH,
      } as Position

      expect(place(position)).toMatchObject({
        x: 3,
        y: 4,
        direction: SOUTH,
      })
    })
  })

  describe('given invalid position values', () => {
    test.each`
      x     | y     | direction
      ${6}  | ${0}  | ${NORTH}
      ${0}  | ${6}  | ${NORTH}
      ${-1} | ${0}  | ${NORTH}
      ${0}  | ${-1} | ${NORTH}
      ${0}  | ${-1} | ${NORTH}
      ${0}  | ${0}  | ${'somewhere over the rainbow'}
    `('throws an error', ({ x, y, direction }) => {
      expect(() => place({ x, y, direction })).toThrowError('invalid position')
    })
  })
})

describe('move', () => {
  describe('moving within the 5x5 table', () => {
    test.each`
      x    | y    | direction | expectedX | expectedY | expectedDirection
      ${1} | ${1} | ${NORTH}  | ${1}      | ${2}      | ${NORTH}
      ${1} | ${1} | ${SOUTH}  | ${1}      | ${0}      | ${SOUTH}
      ${1} | ${1} | ${EAST}   | ${2}      | ${1}      | ${EAST}
      ${1} | ${1} | ${WEST}   | ${0}      | ${1}      | ${WEST}
      ${3} | ${3} | ${NORTH}  | ${3}      | ${4}      | ${NORTH}
    `(
      'moves one unit forward in the $direction direction from ($x, $y, $direction) to ($expectedX, $expectedY, $expectedDirection)',
      ({ x, y, direction, expectedX, expectedY, expectedDirection }) => {
        expect(move({ x, y, direction })).toMatchObject({
          x: expectedX,
          y: expectedY,
          direction: expectedDirection,
        })
      }
    )
  })

  describe('moving towards a position outside the 5x5 table', () => {
    test.each`
      x     | y     | direction | expectedX | expectedY | expectedDirection
      ${5}  | ${5}  | ${NORTH}  | ${5}      | ${5}      | ${NORTH}
      ${0}  | ${0}  | ${SOUTH}  | ${0}      | ${0}      | ${SOUTH}
      ${0}  | ${5}  | ${WEST}   | ${0}      | ${5}      | ${WEST}
      ${5}  | ${0}  | ${EAST}   | ${5}      | ${0}      | ${EAST}
      ${10} | ${10} | ${EAST}   | ${10}     | ${10}     | ${EAST}
    `(
      'does not move one unit forward in the $direction direction and maintains position at ($expectedX, $expectedY, $expectedDirection)',
      ({ x, y, direction, expectedX, expectedY, expectedDirection }) => {
        expect(move({ x, y, direction })).toMatchObject({
          x: expectedX,
          y: expectedY,
          direction: expectedDirection,
        })
      }
    )
  })

  describe('invalid direction', () => {
    it('throws an error', () => {
      // @ts-ignore
      expect(() => move({ x: 0, y: 0, direction: 'foobaz' })).toThrowError('invalid direction')
    })
  })
})

describe('left', () => {
  test.each`
    x    | y    | direction | expectedDirection
    ${2} | ${2} | ${NORTH}  | ${WEST}
    ${2} | ${2} | ${WEST}   | ${SOUTH}
    ${2} | ${2} | ${SOUTH}  | ${EAST}
    ${2} | ${2} | ${EAST}   | ${NORTH}
  `(
    'rotates 90 degrees counterclockwise from $direction to $expectedDirection and maintaining position at ($x, $y)',
    ({ direction, expectedDirection, ...coordinates }) => {
      expect(left({ ...coordinates, direction })).toMatchObject({
        ...coordinates,
        direction: expectedDirection,
      })
    }
  )

  describe('invalid direction', () => {
    it('throws an error', () => {
      // @ts-ignore
      expect(() => left({ x: 0, y: 0, direction: 'foobaz' })).toThrowError('invalid direction')
    })
  })
})

describe('right', () => {
  test.each`
    x    | y    | direction | expectedDirection
    ${2} | ${2} | ${NORTH}  | ${EAST}
    ${2} | ${2} | ${EAST}   | ${SOUTH}
    ${2} | ${2} | ${SOUTH}  | ${WEST}
    ${2} | ${2} | ${WEST}   | ${NORTH}
  `(
    'rotates 90 degrees clockwise from $direction to $expectedDirection and maintaining position at ($x, $y)',
    ({ direction, expectedDirection, ...coordinates }) => {
      expect(right({ ...coordinates, direction })).toMatchObject({
        ...coordinates,
        direction: expectedDirection,
      })
    }
  )

  describe('invalid direction', () => {
    it('throws an error', () => {
      // @ts-ignore
      expect(() => right({ x: 0, y: 0, direction: 'foobaz' })).toThrowError('invalid direction')
    })
  })
})

// ${['REPORT']}                                    | ${{}}
// ${['MOVE']}                                      | ${{}}
// ${['LEFT']}                                      | ${{}}
// ${['RIGHT']}                                     | ${{}}
// ${['RIGHT', 'REPORT']}                           | ${{}}
// ${['MOVE', 'PLACE 0,0,NORTH', 'LEFT', 'REPORT']} | ${{ x: 0, y: 0, direction: WEST }}
// ${['PLACE 0,0,NORTH', 'MOVE', 'REPORT']} | ${[{}, {}, { x: 0, y: 1, direction: NORTH }]}
// ${['PLACE 0,0,NORTH', 'LEFT', 'REPORT']} | ${[{}, {}, { x: 0, y: 0, direction: WEST }]}
// ${['PLACE 2,3,SOUTH', 'REPORT']}         | ${[{}, { x: 2, y: 3, direction: SOUTH }]}
describe('run', () => {
  test.each`
    commandInputs                                      | expectedOutput
    ${['PLACE 0,0,NORTH', 'MOVE']}                     | ${[null, null]}
    ${['PLACE 0,0,NORTH', 'MOVE', 'REPORT']}           | ${[null, null, { x: 0, y: 1, direction: NORTH }]}
    ${['PLACE 0,0,NORTH', 'REPORT', 'MOVE', 'REPORT']} | ${[null, { x: 0, y: 0, direction: NORTH }, null, { x: 0, y: 1, direction: NORTH }]}
  `('running $commandInputs, it shows $expectedOutput', ({ commandInputs, expectedOutput }) => {
    expect(run(commandInputs)).toEqual(expectedOutput)
  })
})
