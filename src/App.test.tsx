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

  it.todo('validates user input')
})
