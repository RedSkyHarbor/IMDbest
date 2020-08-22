import React from "react";
import { useForm } from "react-hook-form";

interface FormData {
  comment: string;
  rating: number;
}

export const CommentForm: React.FC = () => {
  const { register, handleSubmit, errors } = useForm<FormData>();

  const onSubmit = handleSubmit(({ comment, rating }) => {
    console.log("submit form");
    console.log(comment);
    console.log(rating);

    // TODO Make sure auth-token and movieId is in localstorage before fetch
    // TODO UserID should not need to be sent fetch, should be decoded on server side from auth token
    fetch("/api/ratings", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("auth-token") as string,
      },
      body: JSON.stringify({
        movieId: localStorage.getItem("movie_id"),
        userId: 1,
        comment: comment,
        rating: rating,
      }),
    })
      .then((res) => res.json())
      .then((json) => console.log(json))
      .catch((err) => console.error(err));
  });

  return (
    <form onSubmit={onSubmit}>
      <h4>Leave a review</h4>
      <textarea
        placeholder="Leave a comment"
        name="comment"
        ref={register({ required: true })}
      />
      {errors.comment && errors.comment.type === "required" && (
        <span>Leaving a comment is required</span>
      )}
      <br />
      <input
        type="number"
        step=".01"
        min="0"
        placeholder="Leave a rating"
        name="rating"
        ref={register({ required: true })}
      />
      {errors.rating && errors.rating.type === "required" && (
        <span>Leaving a rating is required</span>
      )}
      <br />
      <input type="submit" />
    </form>
  );
};