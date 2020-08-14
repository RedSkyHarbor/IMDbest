import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

interface Movie {
  id: number;
  title: string;
  slug: string;
  picture_url: string;
  avg: number;
}

export const MovieCards: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    // TODO use-html probably unsubscribes from this automatically
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

  return (
    <>
      {movies.map((movie) => (
        <div key={movie.id}>
          <img
            style={{ width: "300px" }}
            src={movie.picture_url}
            alt="movie poster"
          />
          <Link to={`/movie/${movie.slug}`}>{movie.title}</Link>
          <p>{movie.avg.toString().substr(0, 4)}</p>
        </div>
      ))}
    </>
  );
};
