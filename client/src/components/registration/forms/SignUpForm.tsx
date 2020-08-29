import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FormLabel, Input, Button, Text } from "@chakra-ui/core";

interface FormData {
  username: string;
  email: string;
  password: string;
}

interface FailedResponse {
  response: boolean | string;
}

interface SuccessfulResponse {
  response: [
    {
      id: number;
      username: string;
      is_admin: boolean;
    }
  ];
}

export const SignUpForm: React.FC = () => {
  const { register, handleSubmit, errors } = useForm<FormData>();
  const [showValidationErr, setValidationErr] = useState<string>("");
  const history = useHistory();

  const handleResponse = (
    headers: any,
    status: number,
    json: SuccessfulResponse | FailedResponse
  ) => {
    if (typeof json.response === "string") {
      setValidationErr(json.response);
    } else {
      localStorage.setItem("auth-token", headers.get("auth-token"));
      history.replace("/");
    }
  };

  const onSubmit = handleSubmit(({ username, email, password }) => {
    setValidationErr("");
    fetch("/api/sessions/registration", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        username: username,
        password: password,
        email: email,
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
      {showValidationErr === "" ? null : <Text>{showValidationErr}</Text>}
      <FormLabel htmlFor="username">Username</FormLabel>
      <Input
        name="username"
        ref={register({ required: true, minLength: 3, maxLength: 31 })}
      />
      {errors.username && errors.username.type === "required" && (
        <Text>Username is required</Text>
      )}
      {errors.username && errors.username.type === "minLength" && (
        <Text>Username must be at least 3 characters</Text>
      )}
      {errors.username && errors.username.type === "maxLength" && (
        <Text>Username must be less than 31 characters</Text>
      )}
      <FormLabel htmlFor="email">Email</FormLabel>
      <Input
        name="email"
        ref={register({ required: true, maxLength: 64 })}
        type="email"
      />
      {errors.email && errors.email.type === "required" && (
        <Text>Email is required</Text>
      )}
      {errors.email && errors.email.type === "maxLength" && (
        <Text>Email must be less than 64 characters</Text>
      )}
      <FormLabel htmlFor="password">Password</FormLabel>
      <Input
        name="password"
        ref={register({ required: true, minLength: 5, maxLength: 256 })}
        type="password"
      />
      {errors.password && errors.password.type === "required" && (
        <Text>Password is required</Text>
      )}
      {errors.password && errors.password.type === "minLength" && (
        <Text>Password must be at least 5 characters</Text>
      )}
      {errors.password && errors.password.type === "maxLength" && (
        <Text>Password must be less than 256 characters</Text>
      )}
      <Button type="submit">Sign Up</Button>
    </form>
  );
};
