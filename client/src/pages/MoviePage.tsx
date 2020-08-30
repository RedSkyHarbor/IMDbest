import React from "react";
import { MovieDetails } from "../components/movies/MovieDetails";
import { Header } from "../components/header/Header";
import { MovieComments } from "../components/movies/MovieComments";

export const MoviePage: React.FC = () => {
  return (
    <div>
      <Header />
      <MovieDetails />
      <MovieComments />
    </div>
  );
};
