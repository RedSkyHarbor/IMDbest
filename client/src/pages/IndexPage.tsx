import React from "react";
import { MovieCards } from "../components/movies/MovieCards";
import { Login } from "../components/registration/Login";

export const IndexPage: React.FC = () => {
  localStorage.removeItem("movie_id"); // Clean up
  return (
    <div>
      <Login />
      <MovieCards />
    </div>
  );
};
