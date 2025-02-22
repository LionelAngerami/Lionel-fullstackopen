import { useState } from 'react'

function getRandomInt(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min) + min)
}

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
 
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Uint8Array(anecdotes.length))
  

  const setToRandom = () => {
    const random = getRandomInt(0, anecdotes.length)
    return(
      setSelected(random)
    )
  }

  const handleVoteClick = () => {
    const votesTemp = [...votes]
    votesTemp[selected] += 1
    setVotes(votesTemp) 
    }

  const getMostVotedAnecdote = () => {
    const maxVotes = Math.max(...votes)
    const index = votes.indexOf(maxVotes)
    return { anecdote: anecdotes[index], votes: maxVotes }
  }
 
  
  return (
    <div>
      <h1>Anecdote of day</h1>
      <p><i>{anecdotes[selected]}</i></p>
      <p>(Has {votes[selected]} votes)</p>
      <Button handleClick={handleVoteClick} text='vote' />
      <Button handleClick={setToRandom} text='next anecdote' />
      
      <h2>Anecdote with most votes</h2>
      {Math.max(...votes) > 0 ? (
        <div>
        <p><i>{getMostVotedAnecdote().anecdote} </i> </p> 
        <p> (Has: {getMostVotedAnecdote().votes} votes) </p>
        </div>
      ) : (
        <p>There are no votes yet</p>
      )}
      
    </div>
  )
}

export default App