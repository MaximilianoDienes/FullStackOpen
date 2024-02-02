const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const User = require("../models/user");

const api = supertest(app);

beforeEach(async () => {
  await User.deleteMany({});
});

test("post user works correctly", async () => {
  const response = await api
    .post("/api/users")
    .send({
      username: "max",
      name: "max",
      password: "max"
    })
    .expect(201);

  expect(response.body).toMatchObject({
    username: "max",
    name: "max",
    blogs: []
  });
});

test("post user with incorrect username returns matching error", async () => {
  const response = await api
    .post("/api/users")
    .send({
      username: "ma",
      name: "max",
      password: "max"
    })
    .expect(400);

  expect(JSON.parse(response.error.text)).toEqual({
    error: "Both password and username must be at least 3 characters long"
  });
});

test("post user with incorrect password returns matching error", async () => {
  const response = await api
    .post("/api/users")
    .send({
      username: "max",
      name: "max",
      password: "ma"
    })
    .expect(400);

  expect(JSON.parse(response.error.text)).toEqual({
    error: "Both password and username must be at least 3 characters long"
  });
});

test("post user with already used username returns matching error", async () => {
  await api
    .post("/api/users")
    .send({
      username: "max",
      name: "max",
      password: "max"
    })
    .expect(201);

  const response = await api
    .post("/api/users")
    .send({
      username: "max",
      name: "maxxxx",
      password: "maxxxx"
    })
    .expect(400);

  expect(JSON.parse(response.error.text)).toEqual({
    error:
      "User validation failed: username: Error, expected `username` to be unique. Value: `max`"
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
