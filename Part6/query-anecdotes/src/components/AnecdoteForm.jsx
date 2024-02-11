/* eslint-disable react/prop-types */

const AnecdoteForm = ({ newAnecdoteMutation }) => {
  const onCreate = async (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    const result = await newAnecdoteMutation.mutate(content);
    event.target.anecdote.value = "";
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
