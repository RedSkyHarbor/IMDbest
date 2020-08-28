import React from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { Text, Input, Button, Textarea } from "@chakra-ui/core";

interface FormData {
  comment: string;
  rating: number;
}

export const CommentForm: React.FC = () => {
  const { register, handleSubmit, errors } = useForm<FormData>();
  const movieId = localStorage.getItem("movie_id");
  const authToken = localStorage.getItem("auth-token") as string;
  let history = useHistory();

  // TODO show error, if any. need to also get status in this method.
  const handleResponse = (json: any) => {
    history.go(0);
  };

  const onSubmit = handleSubmit(({ comment, rating }) => {
    fetch("/api/ratings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": authToken,
      },
      body: JSON.stringify({
        movieId: movieId,
        comment: comment,
        rating: +rating,
      }),
    })
      .then((res) => res.json())
      .then((json) => handleResponse(json))
      .catch((err) => console.error(err));
  });

  return (
    <form onSubmit={onSubmit}>
      <Text mt="4" fontSize="xl">
        Leave a review
      </Text>
      <Textarea
        placeholder="Leave a comment"
        name="comment"
        resize="vertical"
        ref={register({ required: true, minLength: 3, maxLength: 2055 })}
      />
      {errors.comment && errors.comment.type === "required" && (
        <Text>Leaving a comment is required</Text>
      )}
      {errors.comment && errors.comment.type === "minLength" && (
        <Text>Comment must be at least 3 characters long</Text>
      )}
      {errors.comment && errors.comment.type === "maxLength" && (
        <Text>Comment must be less than 2055 characters long</Text>
      )}
      <Input
        type="number"
        step=".01"
        min="0"
        max="10"
        placeholder="Leave a rating"
        name="rating"
        ref={register({ required: true })}
      />
      {errors.rating && errors.rating.type === "required" && (
        <Text>Leaving a rating is required</Text>
      )}
      <Button type="submit">Submit</Button>
    </form>
  );
};
