const config = require("./utils/config");

const express = require("express");
const app = express();

const cors = require("cors");
const mongoose = require("mongoose");

const middleware = require("./utils/middleware");
const { info, error } = require("./utils/logger");

const blogRouter = require("./controllers/blogs");
const usersRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");
const testingRouter = require("./controllers/testing");

info("connecting to", config.MONGODB_URI);

const connectToMongoDB = async () => {
  await mongoose.connect(config.MONGODB_URI);
  info("Connected to MongoDB");
};

connectToMongoDB();

app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger);

app.use("/api/login", loginRouter);
app.use(middleware.getTokenFrom);
app.use("/api/blogs", middleware.extractUser, blogRouter);

app.use("/api/users", usersRouter);

if (process.env.NODE_ENV === "test") {
  app.use("/api/testing", testingRouter);
}

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
