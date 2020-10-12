import { exitCode } from 'process'
import { place, Position } from './lib'

describe('place', () => {
  describe('no initial position given supplied', () => {
    it('returns a default position', () => {
      expect(place()).toMatchObject({
        x: 0,
        y: 0,
        direction: 'NORTH',
      })
    })
  })

  describe('given an initial position', () => {
    it('returns the intial position', () => {
      const position = {
        x: 3,
        y: 4,
        direction: 'SOUTH',
      } as Position

      expect(place(position)).toMatchObject({
        x: 3,
        y: 4,
        direction: 'SOUTH',
      })
    })
  })

  describe('given invalid position values', () => {
    test.each`
      x     | y     | direction
      ${6}  | ${0}  | ${'NORTH'}
      ${0}  | ${6}  | ${'NORTH'}
      ${-1} | ${0}  | ${'NORTH'}
      ${0}  | ${-1} | ${'NORTH'}
      ${0}  | ${-1} | ${'NORTH'}
      ${0}  | ${0}  | ${'somewhere over the rainbow'}
    `('throws an error', ({ x, y, direction }) => {
      expect(() => place({ x, y, direction })).toThrow()
    })
  })
})
