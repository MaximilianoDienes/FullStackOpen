import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const AllUserView = () => {
  const allUsers = useSelector((state) => state.user.allUsers)
  console.log(allUsers)

  if (!allUsers) {
    return <p>loading...</p>
  }

  return (
    <div>
      <h2>Users info</h2>
      {allUsers.map((u) => (
        <div key={u.id}>
          <Link to={`/user/${u.id}`}>
            <p>{u.name}</p>
          </Link>
          <p>blogs created {u.blogs.length}</p>
          <br />
        </div>
      ))}
    </div>
  )
}

export default AllUserView
