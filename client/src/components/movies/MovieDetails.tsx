import React, { useState, useEffect } from "react";
import { Login } from "../registration/Login";
import { FormSwitch } from "../forms/FormSwitch";

import {
  Box,
  Flex,
  Image,
  Icon,
  Divider,
  SimpleGrid,
  Skeleton,
} from "@chakra-ui/core";

interface MovieDetailsProps {
  movie_id: string;
}

interface Movie {
  id: number;
  title: string;
  slug: string;
  genres: string;
  release_date: string;
  length: string;
  fcc_rating: string;
  picture_url: string;
  avg: number;
  summary: string;
  count: number;
}

export const MovieDetails: React.FC<MovieDetailsProps> = (props) => {
  let [movie, setMovie] = useState<Movie[]>([]);
  let [isLoading, setLoading] = useState<boolean>(true);

  const handleResponse = (json: Movie[]) => {
    setLoading(false);
    setMovie(json);
  };

  useEffect(() => {
    const movieId = props.movie_id;
    const abortController = new AbortController();
    const signal = abortController.signal;

    fetch("/api/movies/" + movieId, {
      signal: signal,
      method: "GET",
    })
      .then((res) => res.json())
      .then((json) => handleResponse(json))
      .catch((err) => console.log(err));

    return () => {
      abortController.abort();
    };
  }, [props.movie_id]);

  return (
    <>
      <SimpleGrid
        gridTemplateColumns="repeat(auto-fit, minmax(320px, 1fr), auto);"
        gridColumnGap="1px"
        justifyItems="center"
        mt="4"
      >
        {movie.map((movie) => (
          <React.Fragment key={movie.id}>
            <Skeleton isLoaded={!isLoading}>
              <Box>
                <Image
                  style={{ width: "300px" }}
                  src={movie.picture_url}
                  minW="xs"
                  maxW="xs"
                  maxH="480px"
                  alt="movie poster"
                />
              </Box>
            </Skeleton>
            <Box mt="1rem" ml="1.5rem">
              <Skeleton isLoaded={!isLoading}>
                <Box
                  fontSize="32px"
                  color="gray:400"
                  fontWeight="semibold"
                  lineHeight="tight"
                >
                  {movie.title}
                </Box>
              </Skeleton>

              <Skeleton isLoaded={!isLoading}>
                <Flex
                  color="gray.500"
                  fontWeight="semibold"
                  letterSpacing="wide"
                  fontSize="xs"
                >
                  <Box>{movie.release_date}</Box>
                  <Divider orientation="vertical" />
                  <Box>{movie.length}</Box>
                  <Divider orientation="vertical" />
                  <Box>{movie.fcc_rating}</Box>
                  <Divider orientation="vertical" />
                  <Box>{movie.genres}</Box>
                </Flex>
              </Skeleton>

              <Skeleton isLoaded={!isLoading}>
                <Box d="flex" mt="1" alignItems="center">
                  {Array(10)
                    .fill("")
                    .map((_, i) => (
                      <Icon
                        name="star"
                        key={i}
                        color={i < movie.avg ? "yellow.500" : "gray:300"}
                      />
                    ))}
                  <Box as="span" ml="2">
                    ({movie.avg.toString().substr(0, 4)})
                  </Box>
                  <Box as="span" ml="2" color="gray.600" fontSize="sm">
                    {movie.count} reviews
                  </Box>
                </Box>
              </Skeleton>
              <Skeleton isLoaded={!isLoading}>
                <Box>{movie.summary}</Box>
              </Skeleton>
            </Box>
          </React.Fragment>
        ))}
      </SimpleGrid>
      <Skeleton isLoaded={!isLoading}>
        {localStorage.getItem("auth-token") ? (
          <FormSwitch movie_id={props.movie_id} />
        ) : (
          <Box ml="1.5rem" mt="4">
            Want to leave a review?&nbsp;
            <Box as="span" color="teal.500">
              <Login />.
            </Box>
          </Box>
        )}
      </Skeleton>
    </>
  );
};
