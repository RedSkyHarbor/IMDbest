import React, { useState, useEffect } from "react";

interface Movie {
  title: string;
  picture_url: string;
  avg: number;
}

export const MovieCards: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    fetch("/api", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((json) => setMovies(json))
      .catch((err) => console.error(err));
  });

  return (
    <div>
      {movies.map((movie) => (
        <div key={movie.title}>
          <img
            style={{ width: "300px" }}
            src={movie.picture_url}
            alt="movie poster"
          />
          <p>{movie.title}</p>
          <p>{movie.avg.toString().substr(0, 4)}</p>
        </div>
      ))}
    </div>
  );
};
