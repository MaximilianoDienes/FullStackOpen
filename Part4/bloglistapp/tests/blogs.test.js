const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");
const { initialBlogs } = require("./test_helper");
const jwt = require("jsonwebtoken");

const api = supertest(app);

let authToken;
let userId;

beforeAll(async () => {
  await api
    .post("/api/users")
    .send({ username: "max22", name: "max22", password: "max22" });

  const loginResponse = await api
    .post("/api/login")
    .send({ username: "max22", password: "max22" });

  console.log("hola este es el token", loginResponse.body.token);
  authToken = `Bearer ${loginResponse.body.token}`;
  console.log("hola este es el authtoken", authToken);
  const decodedToken = jwt.verify(
    loginResponse.body.token,
    process.env.SECRET
  ).id;
  console.log("hola este es el token decodificado", decodedToken);
  userId = new mongoose.Types.ObjectId(decodedToken);
});

beforeEach(async () => {
  await Blog.deleteMany({});

  const blogObjects = initialBlogs.map(
    (blog) => new Blog({ ...blog, user: userId })
  );
  const promiseArray = blogObjects.map((blog) => blog.save());
  await Promise.all(promiseArray);
});

test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .set("Authorization", authToken)
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("all blogs are returned", async () => {
  const response = await api.get("/api/blogs").set("Authorization", authToken);
  expect(response.body).toHaveLength(initialBlogs.length);
});

test("identifier property is named id", async () => {
  const result = await api.get("/api/blogs").set("Authorization", authToken);
  result.body.forEach((b) => {
    expect(b.id).toBeDefined();
    expect(b).not.toHaveProperty("_id");
  });
});

test("post works correctly", async () => {
  const newBlog = {
    title: "hola 6",
    author: "otrousuariodeprueba2",
    url: "test6.com",
    likes: 4
  };

  await api
    .post("/api/blogs")
    .set("Authorization", authToken)
    .send(newBlog)
    .expect(201);
  const result = await api.get("/api/blogs").set("Authorization", authToken);
  expect(result.body.length).toBe(initialBlogs.length + 1);

  const content = result.body.map((r) => r.title);
  expect(content).toContain(newBlog.title);
});

test("if likes is undefined, it defaults to 0", async () => {
  const newBlog = {
    title: "hola 7",
    author: "otrousuariodeprueba2",
    url: "test6.com"
  };

  await api
    .post("/api/blogs")
    .set("Authorization", authToken)
    .send(newBlog)
    .expect(201);
  const result = await api.get("/api/blogs").set("Authorization", authToken);
  expect(result.body.length).toBe(initialBlogs.length + 1);

  const content = result.body.find((b) => b.title === newBlog.title);
  expect(content.likes).toBe(0);
});

test("if title is missing, error 400 is sent", async () => {
  const newBlog = {
    author: "otrousuariodeprueba4",
    url: "test6.com",
    likes: 6
  };

  await api
    .post("/api/blogs")
    .set("Authorization", authToken)
    .send(newBlog)
    .expect(400);
});

test("if author is missing, error 400 is sent", async () => {
  const newBlog = {
    title: "hola 8",
    url: "test6.com",
    likes: 6
  };

  await api
    .post("/api/blogs")
    .set("Authorization", authToken)
    .send(newBlog)
    .expect(400);
});

test("delete works well", async () => {
  const newBlog = {
    title: "delete",
    author: "delete",
    url: "delete",
    likes: 0
  };

  const addedBlog = await api
    .post("/api/blogs")
    .set("Authorization", authToken)
    .send(newBlog)
    .expect(201);

  await api
    .delete(`/api/blogs/${addedBlog.body.id}`)
    .set("Authorization", authToken)
    .expect(204);

  const newResult = await api
    .get("/api/blogs")
    .set("Authorization", authToken)
    .expect(200);
  const newResultIds = newResult.body.map((b) => b.id);
  expect(newResultIds).not.toContain(addedBlog.body.id);
}, 10000);

test("update works correctly", async () => {
  const newBlog = {
    title: "i should update this...",
    author: "update",
    url: "update",
    likes: 0
  };

  const updatedBlog = {
    title: "I UPDATED!!",
    author: "UPDATED",
    url: "UPDATED",
    likes: 10
  };

  const addedBlog = await api
    .post("/api/blogs")
    .set("Authorization", authToken)
    .send(newBlog)
    .expect(201);

  await api
    .put(`/api/blogs/${addedBlog.body.id}`)
    .set("Authorization", authToken)
    .send(updatedBlog)
    .expect(200);
  const newResult = await api
    .get("/api/blogs")
    .set("Authorization", authToken)
    .expect(200);
  const match = newResult.body.find((b) => b.id === addedBlog.body.id);
  expect(match).toMatchObject(updatedBlog);
});

afterAll(async () => {
  await mongoose.connection.close();
});
