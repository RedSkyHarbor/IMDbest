import React from "react";
import { useForm } from "react-hook-form";

interface FormData {
  username: string;
  password: string;
}

export const LoginForm: React.FC = () => {
  const { register, handleSubmit, errors } = useForm<FormData>();
  // TODO Handle response
  const onSubmit = handleSubmit(({ username, password }) => {
    fetch("/api/sessions/login", {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({
        username: username,
        password: password,
        is_admin: false,
      }),
    })
      .then((res) => res.json())
      .then((json) => console.log(json))
      .catch((err) => console.error(err));
  });

  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="username">Username</label>
      <input name="username" ref={register({ required: true })} />
      {errors.username && "Username is required"}
      <label htmlFor="password">Password</label>
      <input
        name="password"
        ref={register({ required: true })}
        type="password"
      />
      {errors.password && "Password is required"}

      <button type="submit">Log in</button>
    </form>
  );
};
