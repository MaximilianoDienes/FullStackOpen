import { createSlice } from '@reduxjs/toolkit'
import login from '../../services/login'
import { setToken } from '../../services/blogs'
import { getAllUsers } from '../../services/users'

const initialState = {
  user: null,
  allUsers: null,
}

const userReducer = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      return {
        user: action.payload.user,
        allUsers: action.payload.allUsers,
      }
    },
    clearUser(state, action) {
      return {
        user: null,
        allUsers: null,
      }
    },
  },
})

const { setUser, clearUser } = userReducer.actions
export default userReducer.reducer

export const loginUser = (userData) => {
  return async (dispatch) => {
    const userResult = await login(userData)
    const allUsersResult = await getAllUsers()
    setToken(userResult.token)
    dispatch(setUser({ user: userResult, allUsers: allUsersResult }))
  }
}

export const alreadyLoggedIn = (userData) => {
  return async (dispatch) => {
    const allUsersResult = await getAllUsers()
    setToken(userData.token)
    dispatch(setUser({ user: userData, allUsers: allUsersResult }))
  }
}

export const logoutUser = () => {
  return async (dispatch) => {
    dispatch(clearUser())
    setToken(null)
  }
}
