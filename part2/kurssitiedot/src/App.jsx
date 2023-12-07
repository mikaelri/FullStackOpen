
const Course = ({course}) => {
  return (
    <div>
      <h1>Web development curriculum</h1>
      {course.map(coursePart => {
        const totalExercises = coursePart.parts.reduce((total, part) => {
          return total + part.exercises;
          }, 0)
      return (
      <div key={coursePart.id}>
        <h2>{coursePart.name}</h2>
        {coursePart.parts.map(part => (
          <p key={part.id}>
            {part.name} {part.exercises}
            </p>
        ))}
        <b>Total of {totalExercises} exercises</b>
    </div>
      );
        })}
    </div>
  );
};

const App = () => {
  const course = [
    {
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
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      <Course course={course} />
    </div>
  )
}

export default App