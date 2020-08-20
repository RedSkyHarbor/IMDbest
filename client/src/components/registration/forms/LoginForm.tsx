import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";

interface FormData {
  username: string;
  password: string;
}

interface FailedLogin {
  response: boolean;
}

interface SuccessfulLogin {
  response: {
    id: number;
    username: string;
    is_admin: boolean;
  };
}

export const LoginForm: React.FC = () => {
  const { register, handleSubmit, errors } = useForm<FormData>();
  const [showNoLoginFound, setNoLoginFound] = useState<boolean>(false);
  const history = useHistory();

  const handleResponse = (
    headers: any,
    status: number,
    json: SuccessfulLogin | FailedLogin
  ) => {
    if (json.response === false) {
      setNoLoginFound(true);
    } else {
      localStorage.setItem("auth-token", headers.get("auth-token"));
      history.replace("/");
    }
  };

  const onSubmit = handleSubmit(({ username, password }) => {
    setNoLoginFound(false);
    fetch("/api/sessions/login", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        username: username,
        password: password,
        is_admin: false,
      }),
    })
      .then((res) =>
        res.json().then((json) => ({
          headers: res.headers,
          status: res.status,
          json: json,
        }))
      )
      .then(({ headers, status, json }) =>
        handleResponse(headers, status, json)
      )
      .catch((err) => console.error(err));
  });

  return (
    <form onSubmit={onSubmit}>
      <h1>Log in</h1>
      {showNoLoginFound === true ? <p>Account not found</p> : null}
      <label htmlFor="username">Username</label>
      <input
        name="username"
        ref={register({ required: true, minLength: 3, maxLength: 31 })}
      />
      {errors.username && errors.username.type === "required" && (
        <p>Username is required</p>
      )}
      {errors.username && errors.username.type === "minLength" && (
        <p>Username must be at least 3 characters</p>
      )}
      {errors.username && errors.username.type === "maxLength" && (
        <p>Username must be less than 31 characters</p>
      )}
      <br />
      <label htmlFor="password">Password</label>
      <input
        name="password"
        ref={register({ required: true, minLength: 5, maxLength: 256 })}
        type="password"
      />
      {errors.password && errors.password.type === "required" && (
        <p>Password is required</p>
      )}
      {errors.password && errors.password.type === "minLength" && (
        <p>Password must be at least 5 characters</p>
      )}
      {errors.password && errors.password.type === "maxLength" && (
        <p>Password must be less than 256 characters</p>
      )}
      <br />
      <button type="submit">Log in</button>
    </form>
  );
};
