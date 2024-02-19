/* eslint-disable indent */
import { createSlice } from '@reduxjs/toolkit'

import {
  getAll,
  deleteBlog,
  likeBlog,
  post,
  pushComment,
} from '../../services/blogs'

const initialState = {
  originalSorting: [],
  blogs: [],
  sorting: '',
}

const blogReducer = createSlice({
  name: 'blogs',
  initialState,
  reducers: {
    setBlogs(state, action) {
      return {
        ...state,
        originalSorting: action.payload,
        blogs: action.payload,
      }
    },
    removeFromList(state, action) {
      const updatedBlogs = state.blogs.filter(
        (blog) => blog.id !== action.payload.id,
      )
      const updatedSortedBlogs = state.originalSorting.filter(
        (blog) => blog.id !== action.payload.id,
      )

      return {
        ...state,
        originalSorting: updatedSortedBlogs,
        blogs: updatedBlogs,
      }
    },
    updateLikes(state, action) {
      const updatedBlogs = state.blogs.map((blog) =>
        blog.id === action.payload.id
          ? { ...blog, likes: blog.likes + 1 }
          : blog,
      )

      const updatedSortedBlogs = state.originalSorting.map((blog) =>
        blog.id === action.payload.id
          ? { ...blog, likes: blog.likes + 1 }
          : blog,
      )

      return {
        ...state,
        originalSorting: updatedSortedBlogs,
        blogs: updatedBlogs,
      }
    },
    updateComments(state, action) {
      const updatedBlogs = state.blogs.map((blog) =>
        blog.id === action.payload.id
          ? {
              ...blog,
              comments: [...blog.comments, action.payload.comment],
            }
          : blog,
      )

      const updatedSortedBlogs = state.originalSorting.map((blog) =>
        blog.id === action.payload.id
          ? {
              ...blog,
              comments: [...blog.comments, action.payload.comment],
            }
          : blog,
      )

      return {
        ...state,
        originalSorting: updatedSortedBlogs,
        blogs: updatedBlogs,
      }
    },
    setSorting(state, action) {
      if (action.payload === 'relevance') {
        return {
          ...state,
          sorting: '',
          blogs: state.originalSorting,
          originalSorting: state.originalSorting,
        }
      }
      if (action.payload === 'likes') {
        const sortedByLikes = state.blogs.sort((a, b) => b.likes - a.likes)

        return {
          ...state,
          sorting: 'likes',
          blogs: sortedByLikes,
          originalSorting: state.originalSorting,
        }
      }
    },
    setNewBlog(state, action) {
      return {
        ...state,
        blogs: [...state.blogs, action.payload],
        originalSorting: [...state.originalSorting, action.payload],
      }
    },
  },
})

const {
  setBlogs,
  removeFromList,
  updateLikes,
  setSorting,
  setNewBlog,
  updateComments,
} = blogReducer.actions
export default blogReducer.reducer

export const setAllBlogs = () => {
  return async (dispatch) => {
    const allBlogs = await getAll()
    dispatch(setBlogs(allBlogs))
  }
}

export const removeBlog = (blog) => {
  return async (dispatch) => {
    await deleteBlog(blog)
    dispatch(removeFromList(blog))
  }
}

export const putBlog = (blog) => {
  return async (dispatch) => {
    console.log(blog)
    await likeBlog(blog)
    dispatch(updateLikes(blog))
  }
}

export const postBlog = (blog) => {
  return async (dispatch) => {
    await post(blog)
    dispatch(setNewBlog(blog))
  }
}

export const sortBy = (type) => {
  return async (dispatch) => {
    dispatch(setSorting(type))
  }
}

export const commentBlog = (blog, comment) => {
  return async (dispatch) => {
    pushComment(blog, comment)
    dispatch(updateComments({ id: blog.id, comment }))
  }
}
