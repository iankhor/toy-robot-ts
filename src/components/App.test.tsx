import React from 'react'
import { render } from '@testing-library/react'
import { screen } from '@testing-library/dom'
import user from '@testing-library/user-event'
import App from './App'

describe('entering commands and obtaining an output of the robot location', () => {
  it('outputs robot location', () => {
    render(<App />)

    const commandInputTextbox = screen.getByRole('textbox', { name: /command input/i })
    user.type(commandInputTextbox, 'place 2,2,NORTH{enter}')
    user.type(commandInputTextbox, 'move{enter}')
    user.type(commandInputTextbox, 'REPORT')

    const runButton = screen.getByRole('button', { name: /run/i })
    user.click(runButton)

    const output = screen.getByText('Output: 2,3,NORTH')
    expect(output).toBeInTheDocument()
  })

  describe('with invalid input', () => {
    function subject() {
      render(<App />)

      const commandInputTextbox = screen.getByRole('textbox', { name: /command input/i })
      user.type(commandInputTextbox, 'place{enter}')

      const runButton = screen.getByRole('button', { name: /run/i })
      user.click(runButton)

      return { commandInputTextbox, runButton }
    }
    it('shows an error message', () => {
      subject()

      const output = screen.getByText('Commands entered are incorrect, please enter a valid sequence of commands')
      expect(output).toBeInTheDocument()
    })

    describe('retrying after an invalid input', () => {
      it('outputs robot location', () => {
        const { commandInputTextbox, runButton } = subject()

        const errorOutput = screen.getByText(
          'Commands entered are incorrect, please enter a valid sequence of commands'
        )
        expect(errorOutput).toBeInTheDocument()

        user.type(commandInputTextbox, '{selectall}{del}')
        user.type(commandInputTextbox, 'place 2,2,NORTH{enter}')
        user.type(commandInputTextbox, 'move{enter}')
        user.type(commandInputTextbox, 'REPORT')
        user.click(runButton)

        const validOutput = screen.getByText('Output: 2,3,NORTH')
        expect(validOutput).toBeInTheDocument()
      })
    })
  })
})
