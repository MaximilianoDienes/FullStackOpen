import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { useState } from 'react'

import { removeBlog, putBlog, commentBlog } from '../store/reducers/blogReducer'
import { setNotification } from '../store/reducers/notificationReducer'
import { pushComment } from '../services/blogs'

const BlogView = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const dispatch = useDispatch()

  const blogs = useSelector((state) => state.blogs.blogs)
  const user = useSelector((state) => state.user.user)

  const [comment, setComment] = useState('')

  const matchingBlog = blogs?.find((b) => b.id === id)

  const handleLike = async (blog) => {
    try {
      dispatch(putBlog(blog))
      dispatch(setNotification('blog liked succesfully!', 'success'))
    } catch (error) {
      console.error('Error liking blog:', error)
      dispatch(setNotification('error liking blog', 'error'))
    }
  }

  const handleDelete = async (blog) => {
    if (window.confirm(`Do you really want to delete "${blog.title}"?`)) {
      try {
        dispatch(removeBlog(blog))
        navigate('/')

        dispatch(setNotification('blog deleted succesfully!', 'success'))
      } catch (error) {
        console.error('Error deleting blog:', error)
        dispatch(setNotification('error deleting blog', 'error'))
      }
    } else {
      return
    }
  }

  if (!matchingBlog) {
    return <p>...loading</p>
  }

  const handleComment = async () => {
    try {
      await dispatch(commentBlog(matchingBlog, comment))
      dispatch(setNotification('blog commented!', 'success'))
      setComment('')
    } catch (error) {
      console.error('Error commenting blog', error)
      dispatch(setNotification('error commenting blog', 'error'))
    }
  }

  return (
    <div>
      <h2>{matchingBlog.title}</h2>
      <br />
      <p>likes {matchingBlog.likes}</p>
      <p>
        added by {matchingBlog.user.name}{' '}
        <button onClick={() => handleLike(matchingBlog)}>like</button>
      </p>
      <div>
        <h4>Comments</h4>
        {matchingBlog.comments.length > 0 ? (
          <ul>
            {matchingBlog.comments.map((c, i) => (
              <li key={i}>{c}</li>
            ))}
          </ul>
        ) : (
          <p>no comments</p>
        )}
        <p>
          post your comment!{' '}
          <input
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="type here...."
          ></input>
          <button onClick={handleComment}>send!</button>
        </p>
      </div>
      {matchingBlog.user.username === user.username ? (
        <button onClick={() => handleDelete(matchingBlog)} id="delete">
          delete
        </button>
      ) : null}
    </div>
  )
}

export default BlogView
