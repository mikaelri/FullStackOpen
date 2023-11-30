import { useState } from 'react'

const Title = ({text}) => <h1>{text}</h1>

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const totalClicks = good + neutral + bad
  const averageClicks = (good - bad) / totalClicks
  const positiveClicks = (good / totalClicks) * 100

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
      good {good}<br></br>
      neutral {neutral}<br></br>
      bad {bad}<br></br>
      all {totalClicks}<br></br>
      average {averageClicks} <br></br>
      positive {positiveClicks} %
    </div>
  )
}

export default App

