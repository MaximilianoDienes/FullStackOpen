const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/user");

usersRouter.post("/", async (request, response, next) => {
  const { username, name, password } = request.body;

  if (password.length < 3 || username.length < 3) {
    return response.status(400).json({
      error: "Both password and username must be at least 3 characters long"
    });
  }

  try {
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const user = new User({
      username,
      name,
      passwordHash
    });

    const savedUser = await user.save();

    response.status(201).json(savedUser);
  } catch (error) {
    next(error);
  }
});

usersRouter.get("/", async (request, response, next) => {
  try {
    const result = await User.find({}).populate("blogs", {
      title: 1,
      url: 1,
      likes: 1
    });
    response.json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = usersRouter;
