import React from "react";
import { useQuery } from "@apollo/client";
import { ALL_BOOKS, ME } from "../queries";

const Recommend = (props) => {
  const {
    loading: loadingBooks,
    error: errorBooks,
    data: dataBooks
  } = useQuery(ALL_BOOKS);
  const { loading: loadingMe, error: errorMe, data: dataMe } = useQuery(ME);

  if (!props.show) {
    return null;
  } else if (loadingBooks || loadingMe) {
    return <p>loading...</p>;
  } else if (errorBooks || errorMe) {
    console.log(errorBooks || errorMe);
    return <p>ERROR</p>;
  }

  return (
    <div>
      <p>
        books in your favorite genre <strong>patterns</strong>
      </p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {dataBooks.allBooks.map((a) =>
            a.genres.includes(dataMe.me.favoriteGenre) ? (
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            ) : null
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Recommend;
