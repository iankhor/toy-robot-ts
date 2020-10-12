import React, { useState, ChangeEvent } from 'react'
import { run, Position } from './lib'

function App(): JSX.Element {
  const [commands, setCommands] = useState<string>('')
  const [outputs, setOutputs] = useState<Position[]>([])

  function onChange(e: ChangeEvent<HTMLTextAreaElement>) {
    setCommands(e.target.value)
  }

  function renderOuputs() {
    return outputs.map((o) => <div key={`${o.x},${o.y},${o.direction}`}>{`Output: ${o.x},${o.y},${o.direction}`}</div>)
  }

  return (
    <>
      <textarea aria-label="command input" value={commands || ''} onChange={onChange} />
      <button onClick={() => setOutputs(run(commands))}>Run</button>
      {renderOuputs()}
    </>
  )
}

export default App
