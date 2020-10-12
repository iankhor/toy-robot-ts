import { parse } from 'path'
import React, { useState, ChangeEvent } from 'react'
import './App.css'

function App() {
  const [commands, setCommands] = useState<string>('')

  function onChange(e: ChangeEvent<HTMLTextAreaElement>) {
    setCommands(e.target.value.toUpperCase())
  }

  return (
    <>
      <textarea aria-label="command input" value={commands || ''} onChange={onChange} />
      <button>Run</button>
      <summary role="summary"></summary>
    </>
  )
}

export default App
