import React from "react";
import { useForm } from "react-hook-form";

interface Movies {
  id: number;
  title: string;
  slug: string;
  picture_url: string;
  length: string;
  genres: string;
  avg: number;
  count: number;
}

interface SearchProps {
  onSearch: (movies: Movies[]) => void;
}

interface FormData {
  title: string;
  order: string;
}

export const SearchForm: React.FC<SearchProps> = (props) => {
  const { register, handleSubmit } = useForm<FormData>();

  const onSubmit = handleSubmit(({ title, order }) => {
    fetch(`/api/movies/search/${title}?order=${order}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((json) => props.onSearch(json))
      .catch((err) => console.error(err));
  });

  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          name="title"
          placeholder="Search IMDbest"
          type="text"
          ref={register}
        />
        <select onChange={onSubmit} name="order" ref={register}>
          <option value="asc">Avg rating ascending</option>
          <option value="desc">Avg rating descending</option>
        </select>
      </form>
    </>
  );
};
