import React, { useState } from "react";

const BlogForm = ({ handleNewBlog }) => {
  const [newBlogTitle, setNewBlogTitle] = useState("");
  const [newBlogAuthor, setNewBlogAuthor] = useState("");
  const [newBlogUrl, setNewBlogUrl] = useState("");

  return (
    <div>
      <h3>create a blog!</h3>
      <form
        onSubmit={() => handleNewBlog(newBlogTitle, newBlogAuthor, newBlogUrl)}
      >
        <label htmlFor="title">title</label>
        <input
          type="text"
          id="title"
          placeholder="title"
          value={newBlogTitle}
          onChange={(e) => setNewBlogTitle(e.target.value)}
        ></input>
        <br />
        <label htmlFor="author">author</label>
        <input
          type="text"
          id="author"
          placeholder="author"
          value={newBlogAuthor}
          onChange={(e) => setNewBlogAuthor(e.target.value)}
        ></input>
        <br />
        <label htmlFor="url">url</label>
        <input
          type="text"
          id="url"
          placeholder="url"
          value={newBlogUrl}
          onChange={(e) => setNewBlogUrl(e.target.value)}
        ></input>
        <br />
        <button type="submit" id="createbutton">
          create
        </button>
      </form>
    </div>
  );
};

export default BlogForm;
