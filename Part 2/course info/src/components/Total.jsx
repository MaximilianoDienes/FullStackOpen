import React from 'react'

const Total = ({ parts }) => {
    let numberOfExercises = parts.reduce((sum, part) => sum + part.exercises, 0);

  return (
    <div>
        <p><strong>total of {numberOfExercises} exercises</strong></p>
    </div>
  )
}

export default Total