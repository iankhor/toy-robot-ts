import React, { useState, ChangeEvent } from 'react'
import { run, Position, validateInput } from './lib'

function App(): JSX.Element {
  const [commands, setCommands] = useState<string>('')
  const [outputs, setOutputs] = useState<Position[]>([])
  const [error, setError] = useState<boolean>(false)

  function onChange(e: ChangeEvent<HTMLTextAreaElement>) {
    setCommands(e.target.value)
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
    <>
      <textarea aria-label="command input" value={commands || ''} onChange={onChange} />
      <button onClick={runCommands}>Run</button>
      {renderOuputs()}
      {error && <div>Commands entered are incorrect, please enter a valid sequence of commands</div>}
    </>
  )
}

export default App
