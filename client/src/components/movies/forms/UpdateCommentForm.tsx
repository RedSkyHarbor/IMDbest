import React from "react";
import { useForm } from "react-hook-form";

interface FormData {
  comment: string;
  rating: number;
}

export const UpdateCommentForm: React.FC<FormData> = (props) => {
  const { register, handleSubmit, errors } = useForm<FormData>();

  // TODO any type
  const handleResponse = (json: any) => {
    console.log(json);
    // TODO force page refresh or re-render all components in page
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
      <h4>Update your review</h4>
      <textarea
        defaultValue={props.comment}
        name="comment"
        ref={register({ required: true, minLength: 3, maxLength: 2055 })}
      />
      {errors.comment && errors.comment.type === "required" && (
        <span>Leaving a comment is required</span>
      )}
      {errors.comment && errors.comment.type === "minLength" && (
        <span>Comment must be at least 3 characters long</span>
      )}
      {errors.comment && errors.comment.type === "maxLength" && (
        <span>Comment must be less than 2055 characters long</span>
      )}
      <br />
      <input
        defaultValue={props.rating}
        type="number"
        step=".01"
        min="0"
        max="10"
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
