import React, { useEffect, useState } from "react";
import { UpdateCommentForm } from "./UpdateCommentForm";
import { CommentForm } from "./CommentForm";
import { Box } from "@chakra-ui/core";

export const FormSwitch: React.FC = () => {
  let [isFirstComment, setIsFirstComment] = useState<boolean>(false);
  let [isFetchFinished, setFetchFinished] = useState<boolean>(false);
  let [comment, setComment] = useState<string>("");
  let [rating, setRating] = useState<number>(-1);
  let [headline, setHeadline] = useState<string>("");

  const handleResponse = (json: any) => {
    if (json.length === 0) {
      setIsFirstComment(true);
    } else {
      setIsFirstComment(false);
      setRating(json[0].rating);
      setComment(json[0].comment);
      setHeadline(json[0].headline);
    }
    setFetchFinished(true);
  };

  useEffect(() => {
    const movieId = localStorage.getItem("movie_id");
    const authToken = localStorage.getItem("auth-token") as string;
    const abortController = new AbortController();
    const signal = abortController.signal;

    // Checks if user has already submit a rating for this movie
    fetch(`/api/ratings/check/${movieId}`, {
      signal: signal,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "auth-token": authToken,
      },
    })
      .then((res) => res.json())
      .then((json) => handleResponse(json))
      .catch((err) => console.error(err));

    return () => {
      abortController.abort();
    };
  }, []);

  // Wait for fetch to finish
  if (isFetchFinished === false) {
    return <div></div>;
  }

  return (
    <Box mr="1.5rem" ml="1.5rem">
      {isFirstComment ? (
        <CommentForm />
      ) : (
        <UpdateCommentForm
          headline={headline}
          comment={comment}
          rating={rating}
        />
      )}
    </Box>
  );
};
