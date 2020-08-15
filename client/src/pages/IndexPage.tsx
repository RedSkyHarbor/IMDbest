import React from "react";
import { MovieCards } from "../components/MovieCards";

export const IndexPage: React.FC = () => {
  localStorage.removeItem("movie_id"); // Clean up
  return (
    <div>
      <MovieCards />
    </div>
  );
};
