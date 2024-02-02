/* eslint-disable react/prop-types */
const RatingButton = ({ handleClick, name }) => {
  return (
    <div>
        <button name={name} onClick={handleClick}>{name}</button>
    </div>
  )
}

export default RatingButton