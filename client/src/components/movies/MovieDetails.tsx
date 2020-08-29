import React, { useState, useEffect } from "react";
import { Box, Flex, Image, Icon, Divider, SimpleGrid } from "@chakra-ui/core";

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
    <SimpleGrid
      columns={{ sm: 1, md: 2 }}
      //gridTemplateColumns=" repeat(auto-fit, minmax(480px, 1fr));"
      //gridTemplateColumns="min-content auto"
      gridColumnGap="1px"
      justifyItems="center"
      mt="4"
    >
      {movie.map((movie) => (
        <React.Fragment key={movie.id}>
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
          <Box ml="1.5rem">
            <Box
              fontSize="32px"
              color="gray:400"
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
                ({movie.avg})
              </Box>
              <Box as="span" ml="2" color="gray.600" fontSize="sm">
                {movie.count} reviews
              </Box>
            </Box>

            <Box>{movie.summary}</Box>
          </Box>
        </React.Fragment>
      ))}
    </SimpleGrid>
  );
};
