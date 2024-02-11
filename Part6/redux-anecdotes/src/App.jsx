import { useEffect } from "react";
import AnecdoteForm from "./components/anecdoteForm";
import AnecdoteList from "./components/AnecdoteList";
import FilterComponent from "./components/FilterComponent";
import Notification from "./components/Notification";

import { useDispatch } from "react-redux";
import { initializeNotes } from "./reducers/anecdoteSlice";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeNotes());
  }, []);

  return (
    <div>
      <h2>Anecdotes</h2>
      <br />
      <Notification />
      <br />
      <FilterComponent />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  );
};

export default App;
