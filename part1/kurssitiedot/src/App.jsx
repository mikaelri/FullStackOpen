const Header = (props) => {
  console.log(props)
  return (
    <h1>
      {props.course}
    </h1>
  )

}

const Content = (props) => {
  console.log(props)

  return (
    <div>
      <p>
      {props.part1}
      {props.part2}
      {props.part3}
      </p>
    </div>
  )

}

const Total = (props) => {
  console.log(props)
  const Totalexercises = props.exercises1 + props.exercises2 + props.exercises3;
  return (
    <p>
      Number of exercises {Totalexercises}
    </p>
  )
  
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header course={course} />
      <Content part1={part1} />
      <Content part2={part2} />
      <Content part3={part3} />
      <Total exercises1={exercises1} exercises2={exercises2} exercises3={exercises3} />
    </div>
  )
}

export default App