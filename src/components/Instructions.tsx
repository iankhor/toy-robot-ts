import React from 'react'
import RobotLogo from './../images/robot.svg'

export default function Instruction(): JSX.Element {
  return (
    <>
      <h2>Toy Robot Challenge</h2>
      <img className="logo" src={RobotLogo} alt="logo" />
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
    </>
  )
}
