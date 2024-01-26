import { useState } from 'react'

import RatingButton from './components/RatingButton'
import Statistics from './components/Statistics'

const App = () => {
  // guarda los clics de cada botón en su propio estado
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleClick = (e) => {
    if (e.target.name === "good") {
      setGood(good + 1);
    } else if (e.target.name === "bad") {
      setBad(bad + 1);
    } else if (e.target.name === "neutral") {
      setNeutral(neutral + 1)
    }
  }

  return (
    <div>
      <div>
        <h2>Give feedback</h2>
        <RatingButton handleClick={handleClick} name={"good"}></RatingButton>
        <RatingButton handleClick={handleClick} name={"neutral"}></RatingButton>
        <RatingButton handleClick={handleClick} name={"bad"}></RatingButton>
      </div>
      <div>
        <Statistics good={good} neutral={neutral} bad={bad}></Statistics>
      </div>
    </div>
  )
}

export default App