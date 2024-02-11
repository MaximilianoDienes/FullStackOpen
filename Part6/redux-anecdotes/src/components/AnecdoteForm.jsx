import { postAndCreateAnecdote } from "../reducers/anecdoteSlice";
import { setNotificationWithTime } from "../reducers/notificationSlice";
import { useDispatch } from "react-redux";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const create = (e) => {
    e.preventDefault();
    console.log(e.target.anecdoteName.value);
    dispatch(postAndCreateAnecdote(e.target.anecdoteName.value));
    dispatch(
      setNotificationWithTime(
        `you created '${e.target.anecdoteName.value}'`,
        5000
      )
    );
    e.target.anecdoteName.value = "";
  };

  return (
    <form onSubmit={create}>
      <h2>create new</h2>
      <div>
        <input name="anecdoteName" />
      </div>
      <button type="submit">create</button>
    </form>
  );
};

export default AnecdoteForm;
