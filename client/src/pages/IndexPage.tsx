import React from "react";
import { MovieCards } from "../components/movies/MovieCards";
import { Header } from "../components/header/Header";

export const IndexPage: React.FC = () => {
  localStorage.removeItem("movie_id"); // Clean up
  return (
    <div>
      <Header />
      <MovieCards />
    </div>
  );
};
