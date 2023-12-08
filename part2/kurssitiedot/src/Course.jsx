import React from "react"

const totalExercises = (parts) => {
    return parts.reduce((total, part) => total + part.exercises,0);
};

const Header = () => {
    return (
      <h1>Web development curriculum</h1>
    )
  }

const Course = ({course}) => {
    return (
      <div>
      <Header/>

        {course.map(coursePart => {
        return (
        <div key={coursePart.id}>
          <h2>{coursePart.name}</h2>
          {coursePart.parts.map(part => (
            <p key={part.id}>
              {part.name} {part.exercises}
              </p>
          ))}

          <b>Total of {totalExercises(coursePart.parts)} exercises</b>
      </div>
        );
          })}
      </div>
    );
}
    
export default Course