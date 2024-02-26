import { ALL_AUTHORS, EDIT_AUTHOR_BORN } from "../queries";
import { useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import Select from "react-select";

const Authors = (props) => {
  const { loading, error, data } = useQuery(ALL_AUTHORS);

  const [editAuthorName, setEditAuthorName] = useState("");
  const [editAuthorBornDate, setEditAuthorBornDate] = useState("");

  const [editAuthor] = useMutation(EDIT_AUTHOR_BORN, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (error) => {
      console.log(error);
    }
  });

  if (!props.show) {
    return null;
  } else if (loading) {
    return <p>loading...</p>;
  } else if (error) {
    console.log(error);
    return <p>ERROR</p>;
  }

  const handleSubmit = (e) => {
    console.log(editAuthorName);
    e.preventDefault();
    const bornDateParsed = parseInt(editAuthorBornDate);
    editAuthor({
      variables: { author: editAuthorName.value, born: bornDateParsed }
    });
  };

  const selectOptions = data.allAuthors.map((a) => ({
    value: a.name,
    label: a.name
  }));

  console.log(data.allAuthors);

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {data.allAuthors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.books.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <form onSubmit={handleSubmit}>
        <p>edit author born date</p>
        <p>
          name:{" "}
          <Select onChange={setEditAuthorName} options={selectOptions}></Select>
        </p>
        <p>
          born date:{" "}
          <input
            onChange={(e) => setEditAuthorBornDate(e.target.value)}
          ></input>
        </p>
        <button type="submit">submit change</button>
      </form>
    </div>
  );
};

export default Authors;
