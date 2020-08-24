import React, { useState, useEffect } from "react";

interface Movie {
  id: number;
  title: string;
  slug: string;
  genres: string;
  release_date: string;
  length: string;
  fcc_rating: string;
  picture_url: string;
  avg: number;
  summary: string;
}

export const MovieDetails: React.FC = () => {
  let [movie, setMovie] = useState<Movie[]>([]);

  useEffect(() => {
    const movieId = localStorage.getItem("movie_id");
    const abortController = new AbortController();
    const signal = abortController.signal;

    fetch("/api/movies/" + movieId, {
      signal: signal,
      method: "GET",
    })
      .then((res) => res.json())
      .then((json) => setMovie(json))
      .catch((err) => console.log(err));

    return () => {
      abortController.abort();
    };
  }, []);

  return (
    <section>
      {movie.map((movie) => (
        <div key={movie.id}>
          <h1>{movie.title}</h1>
          <img
            style={{ width: "300px" }}
            src={movie.picture_url}
            alt="movie poster"
          />
          <h2>{movie.avg.toString().substr(0, 4)}</h2>
          <h2>{movie.genres}</h2>
          <h2>{movie.release_date}</h2>
          <h2>{movie.length}</h2>
          <h2>{movie.fcc_rating}</h2>
          <h2>{movie.summary}</h2>
        </div>
      ))}
    </section>
  );
};
