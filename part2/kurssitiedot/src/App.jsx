
const Header = ({course}) => <h1>{course.name}</h1>;

const Course = ({course}) => {
  const totalExercises = course.parts.reduce((total, part) => total + part.exercises, 0);
  return (
    <div>
      <Header course={course}/>
      {course.parts.map(part => 
          <p key={part.id}>
            {part.name} {part.exercises}
            </p>
        )}
        <b>total of {totalExercises} exercises</b>
    </div>

  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    id: 1,

    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 4
      }
    ]
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )
}

export default App