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
      .then((json) => console.log(json))
      .catch((err) => console.error(err));
  });

  return <div>Movie Cards</div>;
};
