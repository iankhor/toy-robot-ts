import React from 'react'
import { render } from '@testing-library/react'
import { screen } from '@testing-library/dom'
import user from '@testing-library/user-event'
import App from './App'

describe('entering commands and obtaining an output of the robot location', () => {
  it('converts user input to upper case', () => {
    render(<App />)

    const commandInputTextbox = screen.getByRole('textbox', { name: /command input/i })

    // https://github.com/testing-library/user-event/issues/402
    // https://github.com/facebook/create-react-app/issues/7491#issuecomment-520157683
    user.type(commandInputTextbox, 'pLaCe 2,2,nOrTh{enter}')

    expect(commandInputTextbox).toHaveValue('PLACE 2,2,NORTH\n')
  })

  it.todo('validates user input')

  fit('outputs robot location', () => {
    render(<App />)

    const commandInputTextbox = screen.getByRole('textbox', { name: /command input/i })

    user.type(commandInputTextbox, 'PLACE 2,2,NORTH{enter}')
    user.type(commandInputTextbox, 'MOVE{enter}')
    user.type(commandInputTextbox, 'REPORT')

    // const runButton = screen.getByRole('button', { name: /run/i })

    // user.click(runButton)

    // const output = screen.getByText('Output: 0,1,NORTH')
    // expect(output).toBeInTheDocument()
  })
})
