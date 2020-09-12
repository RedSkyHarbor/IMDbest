import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Box, FormLabel, Input, Button, Text, Icon } from "@chakra-ui/core";

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
    <Box>
      <form onSubmit={onSubmit}>
        {showNoLoginFound === true ? (
          <Text textAlign="center" color="red.500">
            Account not found
          </Text>
        ) : null}
        <FormLabel htmlFor="username">Username</FormLabel>
        <Input
          name="username"
          ref={register({ required: true, minLength: 3, maxLength: 31 })}
        />
        {errors.username && errors.username.type === "required" && (
          <Text role="alert" fontSize="xs" color="red.500">
            <Icon name="warning-2" size="10px" mr="1" />
            Username is required
          </Text>
        )}
        {errors.username && errors.username.type === "minLength" && (
          <Text role="alert" fontSize="xs" color="red.500">
            <Icon name="warning-2" size="10px" mr="1" />
            Username must be at least 3 characters
          </Text>
        )}
        {errors.username && errors.username.type === "maxLength" && (
          <Text role="alert" fontSize="xs" color="red.500">
            <Icon name="warning-2" size="10px" mr="1" />
            Username must be less than 31 characters
          </Text>
        )}
        <FormLabel htmlFor="password">Password</FormLabel>
        <Input
          name="password"
          ref={register({ required: true, minLength: 5, maxLength: 256 })}
          type="password"
        />
        {errors.password && errors.password.type === "required" && (
          <Text role="alert" fontSize="xs" color="red.500">
            <Icon name="warning-2" size="10px" mr="1" />
            Password is required
          </Text>
        )}
        {errors.password && errors.password.type === "minLength" && (
          <Text role="alert" fontSize="xs" color="red.500">
            <Icon name="warning-2" size="10px" mr="1" />
            Password must be at least 5 characters
          </Text>
        )}
        {errors.password && errors.password.type === "maxLength" && (
          <Text role="alert" fontSize="xs" color="red.500">
            <Icon name="warning-2" size="10px" mr="1" />
            Password must be less than 256 characters
          </Text>
        )}
        <Button mt="6" width="100%" type="submit">
          Log in
        </Button>
      </form>
    </Box>
  );
};
