import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAnecdotes, postAnecdote, putAnecdote } from "./components/requests";
import { useSetNotification } from "./NotificationContext";

const App = () => {
  const queryClient = useQueryClient();
  const setNotification = useSetNotification();

  const anecdotesQuery = useQuery({
    queryKey: ["anecdote"],
    queryFn: getAnecdotes
  });

  const newAnecdoteMutation = useMutation({
    mutationFn: postAnecdote,
    onSuccess: async (newAnecdote) => {
      await queryClient.setQueryData(["anecdote"], (oldAnecdotes) => [
        ...oldAnecdotes,
        newAnecdote
      ]);
      setNotification("New anecdote added successfully", 5000);
    },
    onError: () => {
      setNotification("content must be 5 characters or more", 5000);
    }
  });

  const voteAnecdoteMutation = useMutation({
    mutationFn: putAnecdote,
    onSuccess: async (updatedAnecdote) => {
      const previousAnecdotes = queryClient.getQueryData(["anecdote"]);
      if (!previousAnecdotes) {
        return;
      }
      const updatedAnecdotes = previousAnecdotes.map((anecdote) =>
        anecdote.id === updatedAnecdote.id ? updatedAnecdote : anecdote
      );
      queryClient.setQueryData(["anecdote"], updatedAnecdotes);
      setNotification("Vote registered successfully", 5000);
    }
  });

  const handleVote = (anecdote) => {
    voteAnecdoteMutation.mutate(anecdote);
    setNotification(`has votado la anecdota '${anecdote.content}'`, 5000);
  };

  if (anecdotesQuery.isFetching) {
    return <div>Fetching anecdotes...</div>;
  } else if (anecdotesQuery.isError) {
    return <div>Error fetching anecdotes. Please refresh the page.</div>;
  }

  const anecdotes = anecdotesQuery.data || [];
  console.log(anecdotes);

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm newAnecdoteMutation={newAnecdoteMutation} />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
