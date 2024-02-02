const blog = require("../models/blog");

const initialBlogs = [
  {
    title: "hola",
    author: "usuariodeprueba",
    url: "test.com",
    likes: 5
  },
  {
    title: "hola 2",
    author: "otrousuariodeprueba",
    url: "test2.com",
    likes: 4
  },
  {
    title: "hola 3",
    author: "otrousuariodeprueba1",
    url: "test3.com",
    likes: 3
  },
  {
    title: "hola 4",
    author: "otrousuariodeprueba2",
    url: "test4.com",
    likes: 2
  },
  {
    title: "hola 5",
    author: "otrousuariodeprueba2",
    url: "test5.com",
    likes: 1
  }
];

const blogsInDb = async () => {
  const blogs = await blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

module.exports = {
  initialBlogs,
  blogsInDb
};
