import React from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { Text, Input, Button, Textarea, Icon } from "@chakra-ui/core";

interface FormData {
  comment: string;
  headline: string;
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

  const onSubmit = handleSubmit(({ comment, rating, headline }) => {
    fetch("/api/ratings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": authToken,
      },
      body: JSON.stringify({
        movieId: movieId,
        headline: headline,
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
      <Input
        placeholder="Leave a headline"
        name="headline"
        type="text"
        ref={register({ required: true, minLength: 3, maxLength: 64 })}
      />
      {errors.headline && errors.headline.type === "required" && (
        <Text fontSize="xs" color="red.500">
          <Icon name="warning-2" size="10px" mr="1" />
          Leaving a headline is required
        </Text>
      )}
      {errors.headline && errors.headline.type === "minLength" && (
        <Text fontSize="xs" color="red.500">
          <Icon name="warning-2" size="10px" mr="1" />
          Headline must be at least 3 characters long
        </Text>
      )}
      {errors.headline && errors.headline.type === "maxLength" && (
        <Text fontSize="xs" color="red.500">
          <Icon name="warning-2" size="10px" mr="1" />
          Headline must be less than 64 characters long
        </Text>
      )}
      <Textarea
        mt="4"
        placeholder="Leave a comment"
        name="comment"
        resize="vertical"
        ref={register({ required: true, minLength: 3, maxLength: 2055 })}
      />
      {errors.comment && errors.comment.type === "required" && (
        <Text fontSize="xs" color="red.500">
          <Icon name="warning-2" size="10px" mr="1" />
          Leaving a comment is required
        </Text>
      )}
      {errors.comment && errors.comment.type === "minLength" && (
        <Text fontSize="xs" color="red.500">
          <Icon name="warning-2" size="10px" mr="1" />
          Comment must be at least 3 characters long
        </Text>
      )}
      {errors.comment && errors.comment.type === "maxLength" && (
        <Text fontSize="xs" color="red.500">
          <Icon name="warning-2" size="10px" mr="1" />
          Comment must be less than 2055 characters long
        </Text>
      )}
      <Input
        mt="4"
        type="number"
        min="0"
        max="10"
        placeholder="Leave a rating [1-10]"
        name="rating"
        ref={register({ required: true })}
      />
      {errors.rating && errors.rating.type === "required" && (
        <Text fontSize="xs" color="red.500">
          <Icon name="warning-2" size="10px" mr="1" />
          Leaving a rating is required
        </Text>
      )}
      <Button mt="4" type="submit">
        Submit
      </Button>
    </form>
  );
};
