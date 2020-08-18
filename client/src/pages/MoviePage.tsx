import React, { useState, useEffect } from "react";
import { Login } from "../components/registration/Login";
import { MovieDetails } from "../components/movies/MovieDetails";

export const MoviePage: React.FC = () => {
  return (
    <>
      <Login />
      <MovieDetails />
    </>
  );
};
