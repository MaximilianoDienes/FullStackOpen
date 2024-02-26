/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useState } from "react";
import { LOGIN } from "../queries";
import { useEffect } from "react";
import { useMutation } from "@apollo/client";

const LoginForm = ({ setToken }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      console.log(error);
    }
  });

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value;
      setToken(token);
      localStorage.setItem("library-user-token", token);
    }
  }, [result.data]);

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ variables: { username, password } });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        <p>
          username{" "}
          <input
            type="text"
            onChange={(e) => setUsername(e.target.value)}
          ></input>
        </p>
        <p>
          password{" "}
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </p>
        <button type="submit">login</button>
      </form>
    </div>
  );
};

export default LoginForm;
