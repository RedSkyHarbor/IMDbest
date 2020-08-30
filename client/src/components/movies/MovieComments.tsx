import React, { useState, useEffect } from "react";
import { Box, Text, Divider, Icon, Skeleton } from "@chakra-ui/core";

interface Comments {
  id: number;
  movieid: number;
  userid: number;
  comment: string;
  username: string;
  rating: number;
  created_at: string;
  was_updated: boolean;
  headline: string;
}

export const MovieComments: React.FC = () => {
  const [comments, setComments] = useState<Comments[]>([]);
  const [isLoading, setLoading] = useState<boolean>(true);

  const handleResponse = (
    headers: Headers,
    status: number,
    json: Comments[]
  ) => {
    if (status === 200) {
      setLoading(false);
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
    <Box ml="1.5rem" mt="4">
      <Skeleton isLoaded={!isLoading}>
        <Text fontSize="xl">User Reviews</Text>
      </Skeleton>

      {comments.map((comment) => (
        <Box mt="2" key={comment.id}>
          <Skeleton isLoaded={!isLoading}>
            <Box fontWeight="semibold">{comment.headline}</Box>

            <Box d="flex" fontSize="xs">
              <Text>{comment.created_at.substr(0, 10)}</Text>
              <Divider orientation="vertical" />
              <Text>by {comment.username}</Text>
            </Box>

            <Box d="flex" mt="1" alignItems="center">
              {Array(10)
                .fill("")
                .map((_, i) => (
                  <Icon
                    name="star"
                    key={i}
                    color={i < comment.rating ? "yellow.500" : "gray:300"}
                  />
                ))}
            </Box>

            {comment.was_updated ? (
              <Text fontSize="xs" as="i">
                (updated)
              </Text>
            ) : null}
            <Text>{comment.comment}</Text>
            <Divider orientation="horizontal" />
          </Skeleton>
        </Box>
      ))}
    </Box>
  );
};
