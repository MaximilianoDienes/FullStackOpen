const {
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
} = require("../utils/list_helper");

const blogs = [
  {
    title: "holaaaa",
    author: "Jorge",
    url: "http://google.com",
    likes: 5,
    id: "65b9361e7e793cb87f24757b"
  },
  {
    title: "hola hola hola",
    author: "Jorge",
    url: "test.com",
    likes: 10,
    id: "65b996fd075ed8784917d4cc"
  },
  {
    title: "hola hola hola",
    author: "yo el admin",
    url: "test.com",
    likes: 5,
    id: "65b9971730aaf07b31aaa6c6"
  },
  {
    title: "hola hola hola",
    author: "yo el admin",
    url: "Rafael",
    likes: 5,
    id: "65b99747ec9163563765d3c9"
  },
  {
    title: "hola hola hola",
    author: "yo el admin",
    url: "test.com",
    likes: 5,
    id: "65b9975528e0b639c516a822"
  }
];

describe("totalLikes", () => {
  test("totalLikes returns correct amount of likes", () => {
    const result = totalLikes(blogs);
    expect(result).toBe(30);
  });
});

describe("favoriteBlog", () => {
  test("favoriteBlog returns the blog post with the most amount of likes", () => {
    const result = favoriteBlog(blogs);
    expect(result).toEqual(blogs[1]);
  });
});

describe("mostBlogs", () => {
  test("mostBlogs returns the user with the most amount of blogs", () => {
    const result = mostBlogs(blogs);
    expect(result).toEqual({
      author: "yo el admin",
      blogs: 3
    });
  });
});

describe("mostLikes", () => {
  test("mostLikes returns the user with the most amount of likes", () => {
    const result = mostLikes([
      ...blogs,
      {
        title: "holaaaa",
        author: "Jorge",
        url: "http://google.com",
        likes: 1,
        id: "65b9361e7e793cb87f247573"
      }
    ]);
    expect(result).toEqual({
      author: "Jorge",
      likes: 16
    });
  });
});
