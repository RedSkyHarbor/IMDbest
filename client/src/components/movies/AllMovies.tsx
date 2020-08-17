import React, { useState, useEffect } from "react";

interface movie {
  id: number;
  title: string;
  slug: string;
  genres: string;
  release_date: string;
  length: string;
  fcc_rating: string;
  picture_url: string;
  summary: string;
}

const AllMovies: React.FC = () => {
  const [movies, setMovies] = useState<movie[]>([]);

  useEffect(() => {
    fetch("/api/movies", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((json) => setMovies(json))
      .catch((err) => console.error(err));
  });

  return (
    <section>
      {movies.map((movie, index) => (
        <div key={index}>
          <p>{movie.id}</p>
          <p>{movie.title}</p>
          <p>{movie.slug}</p>
          <p>{movie.genres}</p>
          <p>{movie.release_date}</p>
          <p>{movie.length}</p>
          <p>{movie.fcc_rating}</p>
          <img src={movie.picture_url} alt="movie poster"></img>
          <p>{movie.summary}</p>
          <hr />
        </div>
      ))}
    </section>
  );
};

export default AllMovies;
