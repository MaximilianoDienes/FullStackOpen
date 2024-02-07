import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Blog from "./Blog";

describe("<Blog />", () => {
  const blog = {
    url: "testurl.com",
    likes: 8,
    author: "el autor del test",
    title: "este es un test!",
    user: {
      username: "max222",
      name: "max222",
      id: "65c0c4135da1c2e248ad3e6b"
    }
  };

  const user = {
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1heDIyIiwiaWQiOiI2NWJjNGYzMmVkY2NkZjExYTc4ZWM3OTYiLCJpYXQiOjE3MDcxMzA2MzQsImV4cCI6MTcwNzEzNDIzNH0.wnZVNOOHsImBX1qShUdd1KoRhMkX_I8SqZHKKbIiZ8Y",
    username: "max22",
    name: "max22"
  };

  let container;

  beforeEach(() => {
    container = render(<Blog blog={blog} user={user} />).container;
  });

  test("renders content", () => {
    const element = screen.getByText("este es un test!");
    screen.debug(element);
    expect(element).toBeDefined();
  });

  test("renders its children", async () => {
    await screen.queryByText("el autor del test");
  });

  test("at start the author/url/likes aren't visible", () => {
    expect(screen.queryByText(blog.url)).toBeNull();
    expect(screen.queryByText(`${blog.likes}`)).toBeNull();
    expect(screen.queryByText(blog.author)).toBeNull();
  });

  test("if the button is clicked, author/url/likes are visible", async () => {
    const user = userEvent.setup();
    const button = screen.getByText("view");
    await user.click(button);

    expect(screen.queryByText(blog.url)).toBeInTheDocument();
    expect(screen.queryByText(`${blog.likes}`)).toBeInTheDocument();
    expect(screen.queryByText(blog.author)).toBeInTheDocument();
  });

  test("if the button is clicked again, author/url/likes aren't visible", async () => {
    const user = userEvent.setup();
    const button = screen.getByText("view");
    await user.click(button);

    expect(screen.queryByText(blog.url)).toBeInTheDocument();
    expect(screen.queryByText(`${blog.likes}`)).toBeInTheDocument();
    expect(screen.queryByText(blog.author)).toBeInTheDocument();

    const button2 = screen.getByText("hide");
    await user.click(button2);

    expect(screen.queryByText(blog.url)).toBeNull();
    expect(screen.queryByText(`${blog.likes}`)).toBeNull();
    expect(screen.queryByText(blog.author)).toBeNull();
  });
});

describe("<Blog /> likes", () => {
  const blog = {
    url: "testurl.com",
    likes: 8,
    author: "el autor del test",
    title: "este es un test!",
    user: {
      username: "max222",
      name: "max222",
      id: "65c0c4135da1c2e248ad3e6b"
    }
  };

  const userr = {
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1heDIyIiwiaWQiOiI2NWJjNGYzMmVkY2NkZjExYTc4ZWM3OTYiLCJpYXQiOjE3MDcxMzA2MzQsImV4cCI6MTcwNzEzNDIzNH0.wnZVNOOHsImBX1qShUdd1KoRhMkX_I8SqZHKKbIiZ8Y",
    username: "max22",
    name: "max22"
  };

  test("likes work as intended", async () => {
    const mockHandler = jest.fn();
    render(<Blog blog={blog} user={userr} handleLike={mockHandler} />);

    const user = userEvent.setup();
    const button = screen.getByText("view");
    await user.click(button);

    const button2 = screen.getByRole("button", { name: /like/i });
    await user.click(button2);
    await user.click(button2);

    expect(mockHandler.mock.calls).toHaveLength(2);
  });
});
