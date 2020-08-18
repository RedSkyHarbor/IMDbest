import React, { useState, useEffect } from "react";
import { MovieDetails } from "../components/movies/MovieDetails";
import { Header } from "../components/header/Header";

export const MoviePage: React.FC = () => {
  return (
    <div>
      <Header />
      <MovieDetails />
    </div>
  );
};
