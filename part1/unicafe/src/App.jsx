import { useState } from 'react'

const Title = ({text}) => <h1>{text}</h1>;

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

const StatisticLine = ({text, value}) => {
  return (<div style= {{display: 'flex', justifyContent: "space-between", width: "150px"}}>
  <span>{text}</span>
  <span>{value}</span>
  </div>
  );
};

const Statistics = ({good, neutral, bad}) => {
  const totalClicks = good + neutral + bad
  const averageClicks = totalClicks === 0 ? 0 : ((good - bad) / totalClicks).toFixed(1)
  const positiveClicks = totalClicks === 0 ? 0 : ((good / totalClicks) * 100).toFixed(1) + " %"

  if (totalClicks === 0){return <>No feedback given</>}
  return(
    <div>
    <StatisticLine text="good" value ={good} />
    <StatisticLine text="neutral" value ={neutral} />
    <StatisticLine text="bad" value ={bad} />
    <StatisticLine text="all" value = {totalClicks} />
    <StatisticLine text="average" value = {averageClicks} />
    <StatisticLine text="positive" value = {positiveClicks}/>
    </div>
  )
  }

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1);
  };

  const handleNeutralClick = () => {
    setNeutral(neutral + 1);
  };

  const handleBadClick = () => {
    setBad(bad + 1)
  };

  return (
    <table>
      <tbody>
        <tr>
          <td>
          <Title text="give feedback"/>
          <Button handleClick={handleGoodClick} text="good" />
          <Button handleClick={handleNeutralClick} text="neutral" />
          <Button handleClick={handleBadClick} text="bad" />
          <Title text="statistics"/>
          <Statistics good={good} neutral={neutral} bad={bad} />
          </td>
        </tr>
      </tbody>
    </table>
  );
}

export default App