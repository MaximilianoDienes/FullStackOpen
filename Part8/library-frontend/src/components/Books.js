import { useQuery } from "@apollo/client";
import { ALL_BOOKS, ALL_GENRES } from "../queries";

import { useState } from "react";

const Books = (props) => {
  const [selectedGenre, setSelectedGenre] = useState(null);

  const {
    loading: booksLoading,
    error: booksError,
    data: booksData,
    refetch: refetchBooks
  } = useQuery(ALL_BOOKS, {
    variables:
      selectedGenre !== null && selectedGenre !== "reset"
        ? { genre: selectedGenre }
        : {}
  });

  const {
    loading: genresLoading,
    error: genresError,
    data: genresData,
    refetch: refetchGenres
  } = useQuery(ALL_GENRES);

  if (!props.show) {
    return null;
  } else if (booksLoading || genresLoading) {
    return <p>loading...</p>;
  } else if (booksError || genresError) {
    console.log(booksError || genresError);
    return <p>ERROR</p>;
  }

  const handleGenre = (g) => {
    if (g === "reset") {
      setSelectedGenre(null);
      refetchBooks();
      refetchGenres();
    } else {
      setSelectedGenre(g);
      refetchBooks();
      refetchGenres();
    }
  };

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Published</th>
          </tr>
          {booksData.allBooks.map((book) => (
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
              <td>{book.published}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <button key="reset" onClick={() => handleGenre("reset")}>
        Reset
      </button>
      {genresData.allGenres.map((genre) => (
        <button key={genre} onClick={() => handleGenre(genre)}>
          {genre}
        </button>
      ))}
    </div>
  );
};

export default Books;
