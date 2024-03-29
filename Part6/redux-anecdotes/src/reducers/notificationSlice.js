/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";

const initialState = null;

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setNotification(state, action) {
      return action.payload;
    },
    clearNotification(state, action) {
      return null;
    }
  }
});

export const setNotificationWithTime = (text, time) => {
  return async (dispatch) => {
    dispatch(setNotification(text));
    setTimeout(() => {
      dispatch(clearNotification());
    }, time);
  };
};

export const { setNotification, clearNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
