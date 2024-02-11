import { useSelector, useDispatch } from "react-redux";
import { updateAnecdote } from "../reducers/anecdoteSlice";
import { setNotificationWithTime } from "../reducers/notificationSlice";

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => state.anecdotes);
  console.log(anecdotes);
  const filter = useSelector((state) => state.filter);
  console.log(filter);

  const orderedAnecdotes = [...anecdotes].sort((a, b) => b.votes - a.votes);
  const filteredAndSortedAnecdotes =
    filter === ""
      ? orderedAnecdotes
      : orderedAnecdotes.filter((a) =>
          a.content.toLowerCase().includes(filter.toLowerCase())
        );

  const dispatch = useDispatch();

  const vote = (anecdote) => {
    dispatch(updateAnecdote(anecdote));
    dispatch(setNotificationWithTime(`you voted '${anecdote.content}'`, 5000));
  };

  return (
    <div>
      {filteredAndSortedAnecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;
