import { run } from './'
import { Direction, CommandInput } from './../types'

const { NORTH, SOUTH, WEST } = Direction
const { MOVE, LEFT, RIGHT, REPORT } = CommandInput

describe('run', () => {
  describe('valid inputs with REPORT command', () => {
    test.each`
      commandInputs                                | expectedOutput
      ${['plAce 0,0,nortH', 'leFt', 'report']}     | ${[{ x: 0, y: 0, direction: WEST }]}
      ${['PLACE 0,0,NORTH', LEFT, REPORT]}         | ${[{ x: 0, y: 0, direction: WEST }]}
      ${['PLACE 0,0,NORTH', MOVE, REPORT]}         | ${[{ x: 0, y: 1, direction: NORTH }]}
      ${['PLACE 0,0,NORTH', MOVE, REPORT]}         | ${[{ x: 0, y: 1, direction: NORTH }]}
      ${['PLACE 2,3,SOUTH', REPORT]}               | ${[{ x: 2, y: 3, direction: SOUTH }]}
      ${['PLACE 0,0,NORTH', REPORT, MOVE, REPORT]} | ${[{ x: 0, y: 0, direction: NORTH }, { x: 0, y: 1, direction: NORTH }]}
      ${[MOVE, 'PLACE 0,0,NORTH', MOVE, REPORT]}   | ${[{ x: 0, y: 1, direction: NORTH }]}
    `('running valid $commandInputs, it shows an output', ({ commandInputs, expectedOutput }) => {
      expect(run(commandInputs.join('\n'))).toEqual(expectedOutput)
    })
  })

  describe('invalid inputs', () => {
    test.each`
      commandInputs            | expectedOutput
      ${[REPORT]}              | ${[]}
      ${[MOVE]}                | ${[]}
      ${[LEFT]}                | ${[]}
      ${[RIGHT]}               | ${[]}
      ${[RIGHT, MOVE, REPORT]} | ${[]}
    `('running invalid $commandInputs, ignores input by returning nothing', ({ commandInputs, expectedOutput }) => {
      expect(run(commandInputs.join('\n'))).toEqual(expectedOutput)
    })
  })

  it('returns nothing without the REPORT command', () => {
    expect(run(['PLACE 0,0,NORTH', 'MOVE'].join('\n'))).toEqual([])
  })
})
