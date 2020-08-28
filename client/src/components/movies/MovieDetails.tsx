import React, { useState, useEffect } from "react";
import { Box, Flex, Image, Icon, Divider } from "@chakra-ui/core";

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

export const MovieDetails: React.FC = () => {
  let [movie, setMovie] = useState<Movie[]>([]);

  const handleResponse = (json: Movie[]) => {
    setMovie(json);
  };

  useEffect(() => {
    const movieId = localStorage.getItem("movie_id");
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
  }, []);

  return (
    <section>
      {movie.map((movie) => (
        <Box key={movie.id}>
          <Box
            fontSize="32px"
            color="gray:400"
            mt="1"
            fontWeight="semibold"
            lineHeight="tight"
          >
            {movie.title}
          </Box>

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

          <Image
            style={{ width: "300px" }}
            src={movie.picture_url}
            minW="sm"
            maxW="sm"
            alt="movie poster"
          />

          <Box d="flex" mt="1" alignItems="center">
            {Array(10)
              .fill("")
              .map((_, i) => (
                <Icon
                  name="star"
                  key={i}
                  color={i < movie.avg ? "teal.500" : "gray:300"}
                />
              ))}
            <Box as="span" ml="2" color="gray.600" fontSize="sm">
              {movie.count} reviews
            </Box>
          </Box>

          <Box>{movie.summary}</Box>
        </Box>
      ))}
    </section>
  );
};
