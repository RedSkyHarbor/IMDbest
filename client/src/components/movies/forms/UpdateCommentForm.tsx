import React from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { Text, Input, Button, Textarea } from "@chakra-ui/core";

interface FormData {
  comment: string;
  rating: number;
}

export const UpdateCommentForm: React.FC<FormData> = (props) => {
  const { register, handleSubmit, errors } = useForm<FormData>();
  let history = useHistory();

  // TODO show error, if any. need to also get status in this method
  const handleResponse = (json: any) => {
    history.go(0);
  };

  const onSubmit = handleSubmit(({ comment, rating }) => {
    const movieId = localStorage.getItem("movie_id");
    const authToken = localStorage.getItem("auth-token") as string;
    const abortController = new AbortController();
    const signal = abortController.signal;

    fetch("/api/ratings/" + movieId, {
      signal: signal,
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accpet: "application/json",
        "auth-token": authToken,
      },
      body: JSON.stringify({
        comment: comment,
        rating: rating,
      }),
    })
      .then((res) => res.json())
      .then((json) => handleResponse(json))
      .catch((err) => console.error(err));
  });

  return (
    <form onSubmit={onSubmit}>
      <Text mt="4" fontSize="xl">
        Update your review
      </Text>
      <Textarea
        defaultValue={props.comment}
        name="comment"
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
      <br />
      <Input
        defaultValue={props.rating}
        type="number"
        step=".01"
        min="0"
        max="10"
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
