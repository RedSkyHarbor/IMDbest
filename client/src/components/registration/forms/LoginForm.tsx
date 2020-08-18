import React from "react";
import { useForm } from "react-hook-form";

interface FormData {
  username: string;
  password: string;
}

export const LoginForm: React.FC = () => {
  const { register, handleSubmit, errors } = useForm<FormData>();
  const onSubmit = handleSubmit(({ username, password }) => {
    console.log(username, password);
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
