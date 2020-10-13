import React, { useState, ChangeEvent } from 'react'
import { run, validateInput } from './../lib'
import { Position } from './../types'
import Instructions from './Instructions'
import './../stylesheets/App.css'

const EXAMPLE_COMMANDS = ['PLACE 2,2,NORTH', 'MOVE', 'MOVE', 'RIGHT', 'RIGHT', 'MOVE', 'REPORT']

function App(): JSX.Element {
  const [commands, setCommands] = useState<string>('')
  const [outputs, setOutputs] = useState<Position[]>([])
  const [error, setError] = useState<boolean>(false)

  function onChange(e: ChangeEvent<HTMLTextAreaElement>) {
    setCommands(e.target.value)
  }

  function prefillCommands() {
    setCommands(EXAMPLE_COMMANDS.join('\n'))
  }

  function renderOuputs() {
    return outputs.map((o) => <div key={`${o.x},${o.y},${o.direction}`}>{`Output: ${o.x},${o.y},${o.direction}`}</div>)
  }

  function reset() {
    setOutputs([])
    setError(false)
  }

  function runCommands() {
    reset()
    validateInput(commands) ? setOutputs(run(commands)) : setError(true)
  }

  return (
    <div className="main center">
      <Instructions />

      <div className="command-input center">
        {renderOuputs()}
        {error && <div>Commands entered are incorrect, please enter a valid sequence of commands</div>}
        <textarea aria-label="command input" value={commands || ''} onChange={onChange} />
        <button onClick={prefillCommands}>Prefill an example</button>
        <button onClick={runCommands}>Run</button>
      </div>
    </div>
  )
}

export default App
