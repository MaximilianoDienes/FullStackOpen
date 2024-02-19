import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  notificationMessage: null,
  notificationType: null,
}

const notificationReducer = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setError(state, action) {
      return {
        ...state,
        notificationMessage: action.payload,
        notificationType: 'error',
      }
    },
    setSuccess(state, action) {
      return {
        ...state,
        notificationMessage: action.payload,
        notificationType: 'success',
      }
    },
    clear(state, action) {
      return {
        ...state,
        notificationMessage: null,
        notificationType: null,
      }
    },
  },
})

const { setError, setSuccess, clear } = notificationReducer.actions
export default notificationReducer.reducer

export const setNotification = (message, type) => {
  return async (dispatch) => {
    if (type === 'error') {
      dispatch(setError(message))
    } else if (type === 'success') {
      dispatch(setSuccess(message))
    }
    setTimeout(() => {
      dispatch(clear())
    }, 2000)
  }
}
