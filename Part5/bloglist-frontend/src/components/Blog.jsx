import { useState } from "react";
import { likeBlog } from "../services/blogs";

const Blog = ({ blog, handleLike, handleDelete, user }) => {
  const [visible, setVisible] = useState(false);

  return (
    <div className="blogpost">
      <p className="visible-div">
        {blog.title}{" "}
        <button onClick={() => setVisible(!visible)}>
          {visible ? "hide" : "view"}
        </button>
      </p>
      {visible && (
        <div>
          <p>{blog.url}</p>
          <p>
            {blog.likes}
            <button onClick={() => handleLike(blog)}>like</button>
          </p>
          <p>{blog.author}</p>
          {blog.user.username === user.username ? (
            <button onClick={() => handleDelete(blog)} id="delete">
              delete
            </button>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default Blog;
