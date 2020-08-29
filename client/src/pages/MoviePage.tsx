import React from "react";
import { MovieDetails } from "../components/movies/MovieDetails";
import { Header } from "../components/header/Header";
import { MovieComments } from "../components/movies/MovieComments";
import { Login } from "../components/registration/Login";
import { FormSwitch } from "../components/movies/forms/FormSwitch";
import { Box } from "@chakra-ui/core";

export const MoviePage: React.FC = () => {
  return (
    <div>
      <Header />
      <MovieDetails />

      {localStorage.getItem("auth-token") ? (
        <FormSwitch />
      ) : (
        <Box ml="1.5rem" mt="4">
          Want to leave a review?&nbsp;
          <Box as="span" color="teal.500">
            <Login />.
          </Box>
        </Box>
      )}

      <MovieComments />
    </div>
  );
};
