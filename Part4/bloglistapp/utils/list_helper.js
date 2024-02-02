const _ = require("lodash");

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  const likes = blogs.reduce((sum, blog) => (sum += blog.likes), 0);
  return likes;
};

const favoriteBlog = (blogs) => {
  return blogs.reduce((maxBlog, currentBlog) => {
    return currentBlog.likes > maxBlog.likes ? currentBlog : maxBlog;
  }, blogs[0]);
};

const mostBlogs = (blogs) => {
  const groupedByAuthor = _.groupBy(blogs, "author");
  const authorWithMostBlogs = _.maxBy(
    Object.keys(groupedByAuthor),
    (author) => groupedByAuthor[author].length
  );
  return {
    author: authorWithMostBlogs,
    blogs: groupedByAuthor[authorWithMostBlogs].length
  };
};

const mostLikes = (blogs) => {
  const groupedByAuthor = _.groupBy(blogs, "author");

  const authorWithMostLikes = _.maxBy(Object.keys(groupedByAuthor), (author) =>
    _.sumBy(groupedByAuthor[author], "likes")
  );

  if (authorWithMostLikes) {
    return {
      author: authorWithMostLikes,
      likes: _.sumBy(groupedByAuthor[authorWithMostLikes], "likes")
    };
  }
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
};
