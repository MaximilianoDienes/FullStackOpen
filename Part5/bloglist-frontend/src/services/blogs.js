import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = async () => {
  const result = await axios.get(baseUrl);
  return result.data;
};

const post = async (postData) => {
  const config = {
    headers: {
      Authorization: token
    }
  };
  const result = await axios.post(baseUrl, postData, config);
  return result.data;
};

const likeBlog = async (blog) => {
  const config = {
    headers: {
      Authorization: token
    }
  };

  const result = await axios.put(
    `${baseUrl}/${blog.id}`,
    { likes: blog.likes + 1 },
    config
  );
  return result.data;
};

const deleteBlog = async (blog) => {
  const config = {
    headers: {
      Authorization: token
    }
  };

  const result = await axios.delete(`${baseUrl}/${blog.id}`, config);
};

export { getAll, post, setToken, likeBlog, deleteBlog };
