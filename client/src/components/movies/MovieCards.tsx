import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

interface Movies {
  id: number;
  title: string;
  slug: string;
  picture_url: string;
  avg: number;
}

export const MovieCards: React.FC = () => {
  const [movies, setMovies] = useState<Movies[]>([]);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    fetch("/api", {
      signal: signal,
      method: "GET",
    })
      .then((res) => res.json())
      .then((json) => setMovies(json))
      .catch((err) => console.error(err));

    return () => {
      abortController.abort();
    };
  }, []);

  const setLocalStorage = (id: string) => {
    localStorage.setItem("movie_id", id);
  };

  return (
    <>
      {movies.map((movie) => (
        <div key={movie.id}>
          <img
            style={{ width: "300px" }}
            src={movie.picture_url}
            alt="movie poster"
          />
          <Link
            onClick={() => setLocalStorage(movie.id.toString())}
            to={`/movie/${movie.slug}`}
          >
            {movie.title}
          </Link>
          <p>{movie.avg.toString().substr(0, 4)}</p>
        </div>
      ))}
    </>
  );
};
