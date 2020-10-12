import React from 'react'
import './App.css'

function App() {
  function onChange(e: any) {
    return e.target.value
  }

  return (
    <>
      <textarea aria-label="command input" onChange={onChange}></textarea>
      <button>Run</button>
      <summary role="summary"></summary>
    </>
  )
}

export default App
