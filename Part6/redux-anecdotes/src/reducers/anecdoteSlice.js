import { createSlice } from "@reduxjs/toolkit";
import {
  getAll,
  postAnecdote,
  putAnecdote
} from "../services/anecdoteServices";

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
      state.push(action.payload);
    },
    voteAnecdote(state, action) {
      const anecdoteToVote = state.find((a) => a.id === action.payload);
      if (anecdoteToVote) {
        anecdoteToVote.votes++;
      }
    },
    setAnecdotes(state, action) {
      return action.payload;
    }
  }
});

export const initializeNotes = () => {
  return async (dispatch) => {
    const notes = await getAll();
    dispatch(setAnecdotes(notes));
  };
};

export const postAndCreateAnecdote = (content) => {
  return async (dispatch) => {
    const result = await postAnecdote(content);
    dispatch(createAnecdote(result));
  };
};

export const updateAnecdote = (anecdote) => {
  return async (dispatch) => {
    await putAnecdote(anecdote);
    dispatch(voteAnecdote(anecdote.id));
  };
};

export default anecdoteSlice.reducer;
export const { createAnecdote, voteAnecdote, setAnecdotes } =
  anecdoteSlice.actions;
