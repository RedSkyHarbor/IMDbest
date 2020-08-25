import React from "react";
import { MovieDetails } from "../components/movies/MovieDetails";
import { Header } from "../components/header/Header";
import { MovieComments } from "../components/movies/MovieComments";
import { Login } from "../components/registration/Login";
import { FormSwitch } from "../components/movies/forms/FormSwitch";

export const MoviePage: React.FC = () => {
  return (
    <div>
      <Header />
      <MovieDetails />
      {localStorage.getItem("auth-token") ? (
        <FormSwitch />
      ) : (
        <p>
          <Login /> to leave a comment
        </p>
      )}
      <MovieComments />
    </div>
  );
};
