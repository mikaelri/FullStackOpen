import { useState } from 'react'

const Title = ({text}) => <h2>{text}</h2>;

const Button = ({ onClick, text }) => {
  return <button onClick={onClick}>{text}</button>;
};

const Anecdote = ({ anecdote, votes }) => {
  return(
    <div>
      {anecdote}<br></br>
      has {votes} votes
    </div>
    );
};

function MaxVoteFinder({ votes, anecdote}) {
const maxVotes = Math.max(...votes)
const maxVoteSelector = votes.indexOf(maxVotes)

return (
  <div>
    {anecdote[maxVoteSelector]}<br></br>
    has {maxVotes} votes
  </div>
)
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0));


  const handleVote = () => {
    const newVotes = [...votes];
    newVotes[selected] += 1;
    setVotes(newVotes);
  };

  return (
    <div>
      <Title text="Anecdote of the day" />
      <Anecdote anecdote={anecdotes[selected]} votes={votes[selected]} />
      <Button onClick={() => setSelected(Math.floor(Math.random() * anecdotes.length))} text="generate anecdote"/>
      <Button onClick={handleVote} text="vote"/>
      <Title text="Anecdote with most votes" />
      <MaxVoteFinder votes={votes} anecdote={anecdotes} />
    </div>
  );
};

export default App