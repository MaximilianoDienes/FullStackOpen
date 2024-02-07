import { useState, useEffect, useRef } from "react";

import Blog from "./components/Blog";
import NotificationMessage from "./components/NotificationMessage";
import Togglable from "./components/Togglable";
import BlogForm from "./components/BlogForm";

import { deleteBlog, getAll, likeBlog, post, setToken } from "./services/blogs";
import login from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [originalBlogs, setOriginalBlogs] = useState([]);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const [notificationType, setNotificationType] = useState("");
  const [notificationMessage, setNotificationMessage] = useState("");

  const createBlogRef = useRef();

  useEffect(() => {
    getAll().then((blogs) => {
      setBlogs(blogs);
      setOriginalBlogs(blogs);
    });
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      setToken(user.token);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const result = await login({
        username: username,
        password: password
      });

      setUser(result);
      setToken(result.token);
      window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(result));

      setNotificationType("success");
      setNotificationMessage("Login was succesfull!");

      setTimeout(() => {
        setNotificationType("");
        setNotificationMessage("");
      }, 2000);
    } catch (error) {
      console.log(error);
      setNotificationType("error");
      setNotificationMessage(error.response.data.error);

      setTimeout(() => {
        setNotificationType("");
        setNotificationMessage("");
      }, 2000);
    }
  };

  const handleLogout = (e) => {
    setToken(null);
    window.localStorage.removeItem("loggedBlogAppUser");
    setUser(null);

    setNotificationType("success");
    setNotificationMessage("Logged out succesfully!");

    setTimeout(() => {
      setNotificationType("");
      setNotificationMessage("");
    }, 2000);
  };

  const handleLike = async (blog) => {
    try {
      const result = await likeBlog(blog);
      console.log(result);
      setBlogs((prevBlogs) =>
        prevBlogs.map((b) => (b.id === result.id ? result : b))
      );
      setOriginalBlogs((prevBlogs) =>
        prevBlogs.map((b) => (b.id === result.id ? result : b))
      );
    } catch (error) {
      console.error("Error liking blog:", error);
    }
  };

  const handleSort = (e) => {
    if (e.target.value === "relevance") {
      setBlogs([...originalBlogs]);
    } else if (e.target.value === "likes") {
      setBlogs([...originalBlogs].sort((a, b) => b.likes - a.likes));
    }
  };

  const handleDelete = async (blog) => {
    if (window.confirm(`Do you really want to delete "${blog.title}"?`)) {
      try {
        const result = await deleteBlog(blog);
        setBlogs((prevBlogs) => prevBlogs.filter((b) => b.id !== blog.id));
        setOriginalBlogs((prevBlogs) =>
          prevBlogs.filter((b) => b.id !== blog.id)
        );
      } catch (error) {
        console.error("Error deleting blog:", error);
      }
    } else {
      return;
    }
  };

  const handleNewBlog = async (newBlogAuthor, newBlogTitle, newBlogUrl) => {
    try {
      const result = await post({
        title: newBlogTitle,
        author: newBlogAuthor,
        url: newBlogUrl
      });

      setBlogs(blogs.concat([result]));
      createBlogRef.current.toggleVisibility();
      setNotificationType("success");
      setNotificationMessage("Blog was created succesfully!");

      setTimeout(() => {
        setNotificationType("");
        setNotificationMessage("");
      }, 2000);
    } catch (error) {
      console.log(error);
      setNotificationType("error");
      setNotificationMessage(error.response.data.error);

      setTimeout(() => {
        setNotificationType("");
        setNotificationMessage("");
      }, 2000);
    }
  };

  return (
    <div>
      <h2>blogs</h2>
      <NotificationMessage
        type={notificationType}
        message={notificationMessage}
      />
      {user === null && (
        <form onSubmit={handleLogin} id="form">
          <label htmlFor="username">username</label>
          <input
            id="username"
            value={username}
            type="text"
            onChange={(e) => setUsername(e.target.value)}
          ></input>
          <br />

          <label htmlFor="password">password</label>
          <input
            id="password"
            value={password}
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          ></input>
          <br />
          <button type="submit">Login</button>
        </form>
      )}
      {user && (
        <div>
          <p>
            {user.name} logged in{" "}
            <button onClick={handleLogout} id="logout">
              logout
            </button>
          </p>
          <br />
          <p>sort by</p>
          <select onChange={handleSort}>
            <option value="relevance">relevance</option>
            <option value="likes">likes</option>
          </select>
          <div id="blogsdiv">
            {blogs.map((blog) => (
              <Blog
                key={blog.id}
                blog={blog}
                handleLike={handleLike}
                handleDelete={handleDelete}
                user={user}
              />
            ))}
          </div>
          <Togglable buttonLabel="create a new blog!" ref={createBlogRef}>
            <BlogForm handleNewBlog={handleNewBlog} />
          </Togglable>
        </div>
      )}
    </div>
  );
};

export default App;
