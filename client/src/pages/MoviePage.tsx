import React, { useState, useEffect } from "react";
import { Login } from "../components/registration/Login";

interface Movie {
  id: number;
  title: string;
  slug: string;
  genres: string;
  release_date: string;
  length: string;
  fcc_rating: string;
  summary: string;
}

export const MoviePage: React.FC = () => {
  let [movie, setMovie] = useState<Movie[]>([]);

  useEffect(() => {
    const movieId = localStorage.getItem("movie_id");
    const abortController = new AbortController();
    const signal = abortController.signal;

    // TODO use-html instead of fetch
    fetch("/api/movies/" + movieId, {
      signal: signal,
      method: "GET",
    })
      .then((res) => res.json())
      .then((json) => setMovie(json))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <Login />
      {movie.map((movie) => (
        <div key={movie.id}>
          <h1>{movie.title}</h1>
          <h2>{movie.genres}</h2>
          <h2>{movie.release_date}</h2>
          <h2>{movie.length}</h2>
          <h2>{movie.fcc_rating}</h2>
          <h2>{movie.summary}</h2>
        </div>
      ))}
    </>
  );
};
