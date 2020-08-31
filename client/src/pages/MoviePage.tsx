import React from "react";
import { RouteComponentProps } from "react-router-dom";
import { MovieDetails } from "../components/movies/MovieDetails";
import { Header } from "../components/header/Header";
import { MovieComments } from "../components/movies/MovieComments";

interface MatchParams {
  movie_id: string;
  slug: string;
}

interface MoviePageProps extends RouteComponentProps<MatchParams> {}

export const MoviePage: React.FC<MoviePageProps> = (props) => {
  const movie_id = props.match.params.movie_id;
  return (
    <div>
      <Header />
      <MovieDetails movie_id={movie_id} />
      <MovieComments movie_id={movie_id} />
    </div>
  );
};
