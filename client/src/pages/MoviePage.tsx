import React from "react";
import { MovieDetails } from "../components/movies/MovieDetails";
import { Header } from "../components/header/Header";
import { MovieComments } from "../components/movies/MovieComments";
import { CommentForm } from "../components/movies/forms/CommentForm";
import { Login } from "../components/registration/Login";

export const MoviePage: React.FC = () => {
  return (
    <div>
      <Header />
      <MovieDetails />
      {localStorage.getItem("auth-token") ? (
        <CommentForm />
      ) : (
        <p>
          <Login /> to leave a comment
        </p>
      )}
      <MovieComments />
    </div>
  );
};
