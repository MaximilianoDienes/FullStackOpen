import { useState, useEffect, useRef } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { setNotification } from '../store/reducers/notificationReducer'
import { postBlog, setAllBlogs, sortBy } from '../store/reducers/blogReducer'
import {
  alreadyLoggedIn,
  loginUser,
  logoutUser,
} from '../store/reducers/userReducer'

import Blog from '../components/Blog'
import Togglable from '../components/Togglable'
import BlogForm from '../components/BlogForm'

const Home = () => {
  const blogs = useSelector((state) => state.blogs.blogs)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const user = useSelector((state) => state.user.user)

  const createBlogRef = useRef()

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setAllBlogs())
  }, [])

  useEffect(() => {
    const initializeUser = async () => {
      const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
      if (loggedUserJSON) {
        const user = JSON.parse(loggedUserJSON)
        await dispatch(alreadyLoggedIn(user))
      }
    }

    initializeUser()
  }, [])

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      await dispatch(loginUser({ username: username, password: password }))
      dispatch(setNotification('logged in succesfully!', 'success'))
    } catch (error) {
      console.log(error)
      dispatch(setNotification('error logging in', 'error'))
    }
  }

  const handleLogout = (e) => {
    window.localStorage.removeItem('loggedBlogAppUser')
    dispatch(logoutUser())
    dispatch(setNotification('logged out succesfully!', 'success'))
  }

  const handleSort = (e) => {
    dispatch(sortBy(e.target.value))
  }

  const handleNewBlog = async (newBlogAuthor, newBlogTitle, newBlogUrl) => {
    try {
      dispatch(
        postBlog({
          title: newBlogTitle,
          author: newBlogAuthor,
          url: newBlogUrl,
        }),
      )

      createBlogRef.current.toggleVisibility()
      dispatch(setNotification('blog created succesfully!', 'success'))
    } catch (error) {
      dispatch(setNotification('error creating blog', 'error'))
    }
  }

  if ((blogs === null) | (blogs === undefined)) {
    return (
      <div>
        <p>loading...</p>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      {user === null && (
        <form onSubmit={handleLogin} id="form">
          <label htmlFor="username">username</label>
          <input
            id="username"
            value={username}
            type="text"
            onChange={(e) => setUsername(e.target.value)}
          ></input>
          <br />

          <label htmlFor="password">password</label>
          <input
            id="password"
            value={password}
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          ></input>
          <br />
          <button type="submit">Login</button>
        </form>
      )}
      {user && (
        <div>
          <p>
            {user.name} logged in{' '}
            <button onClick={handleLogout} id="logout">
              logout
            </button>
          </p>
          <br />
          <p>sort by</p>
          <select onChange={handleSort}>
            <option value="relevance">relevance</option>
            <option value="likes">likes</option>
          </select>
          <div id="blogsdiv">
            {blogs.map((blog) => (
              <Blog key={blog.id} blog={blog} />
            ))}
          </div>
          <Togglable buttonLabel="create a new blog!" ref={createBlogRef}>
            <BlogForm handleNewBlog={handleNewBlog} />
          </Togglable>
        </div>
      )}
    </div>
  )
}

export default Home
