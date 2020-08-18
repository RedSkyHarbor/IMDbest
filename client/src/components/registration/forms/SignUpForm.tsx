import React from "react";
import { useForm } from "react-hook-form";

interface FormData {
  username: string;
  email: string;
  password: string;
}

export const SignUpForm: React.FC = () => {
  const { register, handleSubmit, errors } = useForm<FormData>();

  const onSubmit = handleSubmit(({ username, email, password }) => {
    // TODO handle response by storing in Context?
    fetch("/api/sessions/registration", {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({
        username: username,
        password: password,
        email: email,
        is_admin: false,
      }),
    })
      .then((res) => res.json())
      .then((json) => console.log(json))
      .catch((err) => console.log(err));
  });

  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="username">Username</label>
      <input name="username" ref={register({ required: true })} />
      {errors.username && "Username is required"}
      <label htmlFor="email">Email</label>
      <input name="email" ref={register({ required: true })} type="email" />
      {errors.email && "Email is required"}
      <label htmlFor="password">Password</label>
      <input
        name="password"
        ref={register({ required: true })}
        type="password"
      />
      {errors.password && "Password is required"}

      <button type="submit">Sign Up</button>
    </form>
  );
};
