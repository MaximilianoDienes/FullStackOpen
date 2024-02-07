import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import BlogForm from "./BlogForm";
import userEvent from "@testing-library/user-event";

test("<BlogForm /> calls event handler with the correct info", async () => {
  const handleNewBlog = jest.fn();
  const user = userEvent.setup();

  render(<BlogForm handleNewBlog={handleNewBlog} />);

  const inputTitle = screen.getByPlaceholderText("title");
  const inputAuthor = screen.getByPlaceholderText("author");
  const inputUrl = screen.getByPlaceholderText("url");

  await user.type(inputTitle, "hola!");
  await user.type(inputAuthor, "John Doe");
  await user.type(inputUrl, "https://example.com");

  const sendButton = screen.getByText("create");
  await user.click(sendButton);

  expect(handleNewBlog.mock.calls).toHaveLength(1);
  expect(handleNewBlog.mock.calls[0][0]).toBe("hola!");
});
