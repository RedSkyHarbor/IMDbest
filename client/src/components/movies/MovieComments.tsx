import React, { useState, useEffect } from "react";

interface Comments {
  id: number;
  movieid: number;
  userid: number;
  comment: string;
  username: string;
  rating: number;
}

export const MovieComments: React.FC = () => {
  const [comments, setComments] = useState<Comments[]>([]);

  const handleResponse = (
    headers: Headers,
    status: number,
    json: Comments[]
  ) => {
    if (status === 200) {
      setComments(json);
    }
  };

  useEffect(() => {
    const movieId = localStorage.getItem("movie_id");
    const abortController = new AbortController();
    const signal = abortController.signal;
    fetch("/api/ratings/" + movieId, {
      signal: signal,
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) =>
        res.json().then((json) => ({
          headers: res.headers,
          status: res.status,
          json: json,
        }))
      )
      .then(({ headers, status, json }) =>
        handleResponse(headers, status, json)
      )
      .catch((err) => console.error(err));

    return () => {
      abortController.abort();
    };
  }, []);

  return (
    <section>
      {comments.map((comment) => (
        <div key={comment.id}>
          <p>{comment.comment}</p>
          <p>{comment.username}</p>
          <p>{comment.rating}</p>
        </div>
      ))}
    </section>
  );
};
