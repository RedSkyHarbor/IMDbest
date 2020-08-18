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
      <h1>Sign up</h1>
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
      <label htmlFor="email">Email</label>
      <input
        name="email"
        ref={register({ required: true, maxLength: 64 })}
        type="email"
      />
      {errors.email && errors.email.type === "required" && (
        <p>Email is required</p>
      )}
      {errors.email && errors.email.type === "maxLength" && (
        <p>Email must be less than 64 characters</p>
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
      <button type="submit">Sign Up</button>
    </form>
  );
};
