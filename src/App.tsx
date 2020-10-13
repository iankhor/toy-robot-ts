import React, { useState, ChangeEvent } from 'react'
import { run, Position, validateInput } from './lib'
import './App.css'

const EXAMPLE_COMMANDS = ['PLACE 2,2,NORTH', 'MOVE', 'MOVE', 'RIGHT', 'RIGHT', 'MOVE', 'REPORT']

function Instruction(): JSX.Element {
  return (
    <pre>
      Simple Instructions
      <ol>
        <li>Enter commands in the textbox below or click on the prefill an example button</li>
        <li>Click on run</li>
      </ol>
      Example Commands
      <ul>
        <li>PLACE 2,3,NORTH</li>
        <li>MOVE</li>
        <li>LEFT</li>
        <li>RIGHT</li>
        <li>REPORT</li>
      </ul>
    </pre>
  )
}

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
      <Instruction />

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
