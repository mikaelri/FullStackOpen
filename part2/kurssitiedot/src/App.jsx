
import React from "react";
import Course from "./Course";

const App = (props) => {
  const { course } = props
  return (
    <div>
      <Course course={course} />
    </div>
  )
}

export default App