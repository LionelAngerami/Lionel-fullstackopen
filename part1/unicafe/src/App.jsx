import { useState } from 'react'


const History = ({ good, neutral, bad }) => {
  if (good+bad+neutral === 0) {
    return (
      <>
        No feefback given
      </>
    )
  }
  return (
    <>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  )
}

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad
  return (
    <table>
      <tbody>
        <tr><td>Good </td><td>{good}</td></tr>
        <tr><td>Neutral </td><td>{neutral}</td></tr>
        <tr><td>Bad </td><td>{bad}</td></tr>
        <tr><td>All </td><td>{total}</td></tr>
        <tr><td>Average </td><td>{(good - bad) / (total)}</td></tr>
        <tr><td>Positive </td><td>{good / (total) * 100} %</td></tr>
      </tbody>
    </table>
  )
}

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    const updatedGood = good + 1
    setGood(updatedGood)
  }

  const handleNeutralClick = () => {
    const updatedNeutral = neutral + 1
    setNeutral(updatedNeutral)
  }

  const handleBadClick = () => {
    const updatedBad = bad + 1
    setBad(updatedBad)
    }

  return (
    <div>
      <h1>Give feedback</h1>
      <Button handleClick={handleGoodClick} text='good' /> 
      <Button handleClick={handleNeutralClick} text='neutral' /> 
      <Button handleClick={handleBadClick} text='bad' /> 
      <h2>Statistics</h2>
      <History good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App