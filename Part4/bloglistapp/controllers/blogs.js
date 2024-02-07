const blogRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

const { info, error } = require("../utils/logger");

blogRouter.get("/", async (request, response, next) => {
  try {
    const result = await Blog.find({}).populate("user", {
      username: 1,
      name: 1
    });
    response.json(result);
  } catch (error) {
    next(error);
  }
});

blogRouter.post("/", async (request, response, next) => {
  try {
    console.log("hola jajajajajja");
    if (!request.body.likes) {
      request.body.likes = 0;
    }
    if (!request.user.id) {
      return response.status(401).json({ error: "token invalid" });
    }
    const user = await User.findById(request.user.id);

    if (!request.body.author || !request.body.title || !request.body.url) {
      return response.status(400).json({ error: "Missing data" });
    }
    const blog = new Blog({
      author: request.body.author,
      title: request.body.title,
      url: request.body.url,
      user: user.id
    });

    const result = await blog.save();

    user.blogs = user.blogs.concat(result._id);
    await user.save();
    console.log(user);

    response.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

blogRouter.delete("/:id", async (request, response, next) => {
  try {
    if (!request.user.id) {
      return response.status(401).json({ error: "token invalid" });
    }

    const post = await Blog.findById(request.params.id).populate("user", {
      username: 1,
      name: 1
    });

    if (post.user._id.toString() === request.user.id) {
      await Blog.findByIdAndDelete(request.params.id);
      return response.status(204).end();
    } else {
      return response
        .status(401)
        .json({ error: "forbidden: you can only delete your own posts" });
    }
  } catch (error) {
    next(error);
  }
});

blogRouter.put("/:id", async (request, response, next) => {
  try {
    if (!request.user.id) {
      return response.status(401).json({ error: "token invalid" });
    }

    const updatedBlog = request.body;
    delete updatedBlog.id;

    const post = await Blog.findById(request.params.id).populate("user", {
      username: 1,
      name: 1
    });

    if (post.user._id.toString() === request.user.id) {
      const result = await Blog.findByIdAndUpdate(
        request.params.id,
        { $set: updatedBlog },
        { new: true }
      );

      return response.status(200).json(result);
    } else {
      console.log("HOLAAAAAAAAAAAAA 2");

      return response
        .status(401)
        .json({ error: "forbidden: you can only update your own posts" });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = blogRouter;
