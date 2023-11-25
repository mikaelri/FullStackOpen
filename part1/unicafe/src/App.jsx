import { useState } from 'react'

const Title = ({text}) => <h1>{text}</h1>

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    const updateGood = good + 1
    setGood(updateGood)
  }

  const handleNeutralClick = () => {
    const updateNeutral = neutral + 1
    setNeutral(updateNeutral)
  }

  const handleBadClick = () => {
    const updateBad = bad + 1
    setBad(updateBad)
  }

  return (
    <div>
      <Title text="give feedback"/>
      <button onClick={handleGoodClick}>good</button>
      <button onClick={handleNeutralClick}>neutral</button>
      <button onClick={handleBadClick}>bad</button>
      <Title text="statistics"/>
      good: {good}<br></br>
      neutral: {neutral}<br></br>
      bad: {bad}
    </div>
  )
}

export default App