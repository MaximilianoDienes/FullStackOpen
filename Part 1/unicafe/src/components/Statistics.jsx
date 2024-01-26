/* eslint-disable react/prop-types */
const StatisticsLine = ({ text, value }) => {
    return (
        <tr>
            <td>{text}</td>
            <td>{value}</td>
        </tr>
    )
}

const Statistics = ({ good, neutral, bad }) => {
    if (good === 0 && neutral === 0 && bad === 0) {
      return (
        <div>
          <p>No feedback given</p>
        </div>
      )
    }
  
    return (
      <div>
        <h2>Statistics</h2>
        <table>
            <tbody>
                <StatisticsLine text="good" value={good}></StatisticsLine>
                <StatisticsLine text="neutral" value={neutral}></StatisticsLine>
                <StatisticsLine text="bad" value={bad}></StatisticsLine>
                <StatisticsLine text="all" value={good + neutral + bad}></StatisticsLine>
                <StatisticsLine text="average" value={(good - bad) / (good + neutral + bad)}></StatisticsLine>
                <StatisticsLine text="positive" value={`${((good) / (good + neutral + bad)) * 100}%`}></StatisticsLine>
            </tbody>
        </table>
      </div>
    )
}

export default Statistics