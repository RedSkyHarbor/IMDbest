import React, { useState, useEffect } from "react";
import { Box, Text, Divider, Icon } from "@chakra-ui/core";

interface Comments {
  id: number;
  movieid: number;
  userid: number;
  comment: string;
  username: string;
  rating: number;
  created_at: string;
  was_updated: boolean;
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
        <Box key={comment.id}>
          <Box d="flex" mt="1" alignItems="center">
            {Array(10)
              .fill("")
              .map((_, i) => (
                <Icon
                  name="star"
                  key={i}
                  color={i < comment.rating ? "teal.500" : "gray:300"}
                />
              ))}
            <Box ml="1" fontWeight="semibold">
              Headline
            </Box>
          </Box>
          <Box d="flex" fontSize="xs">
            <Text>{comment.created_at.substr(0, 10)}</Text>
            <Divider orientation="vertical" />
            <Text>by {comment.username}</Text>
          </Box>
          {comment.was_updated ? <Text as="i">(updated)</Text> : null}
          <Text>{comment.comment}</Text>
          <Divider orientation="horizontal" />
        </Box>
      ))}
    </section>
  );
};
