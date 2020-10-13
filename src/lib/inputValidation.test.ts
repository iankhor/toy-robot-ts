import { validateInput } from './inputValidation'
import { CommandInput } from '../types'

const { PLACE, MOVE, LEFT, RIGHT, REPORT } = CommandInput

describe('validateInput', () => {
  test.each`
    commandInputs                                          | expectedOutput
    ${[PLACE]}                                             | ${false}
    ${['foobaz']}                                          | ${false}
    ${['report']}                                          | ${true}
    ${[REPORT]}                                            | ${true}
    ${['PLACE 1,1,SOUTH']}                                 | ${true}
    ${[MOVE]}                                              | ${true}
    ${[LEFT]}                                              | ${true}
    ${[RIGHT, LEFT, REPORT]}                               | ${true}
    ${[RIGHT, 'PLACE 1,1,SOUTH', LEFT, 'PLACE 1,1,SOUTH']} | ${true}
  `('validates $commandInputs, and returns $expectedOutput', ({ commandInputs, expectedOutput }) => {
    expect(validateInput(commandInputs.join('\n'))).toEqual(expectedOutput)
  })
})
