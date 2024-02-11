import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";

export const getAll = async () => {
  const result = await axios.get(baseUrl);
  return result.data;
};

export const postAnecdote = async (anecdote) => {
  const result = await axios.post(baseUrl, { content: anecdote, votes: 0 });
  return result.data;
};

export const putAnecdote = async (anecdote) => {
  await axios.put(`${baseUrl}/${anecdote.id}`, {
    ...anecdote,
    votes: anecdote.votes + 1
  });
};
