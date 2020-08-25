import React from "react";
import { MovieCards } from "../components/movies/MovieCards";
import { Header } from "../components/header/Header";

export const IndexPage: React.FC = () => {
  return (
    <div>
      <Header />
      <MovieCards />
    </div>
  );
};
