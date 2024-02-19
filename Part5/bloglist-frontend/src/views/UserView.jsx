import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const UserView = () => {
  const { id } = useParams()
  const users = useSelector((state) => state.user.allUsers)
  const matchingUser = users?.find((u) => u.id === id)

  if (!matchingUser) {
    return <p>...loading</p>
  }

  return (
    <div>
      <h2>{matchingUser.name}</h2>
      <br />
      <h3>Added blogs</h3>
      <ul>
        {matchingUser.blogs.length === 0 ? (
          <p>no blogs posted</p>
        ) : (
          matchingUser.blogs.map((b) => <li key={b.id}>{b.title}</li>)
        )}
      </ul>
    </div>
  )
}

export default UserView
