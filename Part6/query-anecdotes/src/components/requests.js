import axios from "axios";
const baseUrl = "http://localhost:3001/anecdotes";

export const getAnecdotes = async () => {
  const result = await axios.get(baseUrl);
  return result.data;
};

export const postAnecdote = async (content) => {
  const anecdote = {
    content,
    votes: 0
  };
  const result = await axios.post(baseUrl, anecdote);
  return result.data;
};

export const putAnecdote = async (anecdote) => {
  console.log(anecdote);
  const updatedAnecdote = { ...anecdote, votes: anecdote.votes + 1 };

  const result = await axios.put(`${baseUrl}/${anecdote.id}`, updatedAnecdote);
  return updatedAnecdote;
};
