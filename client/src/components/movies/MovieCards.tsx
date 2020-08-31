import React, { useState, useEffect } from "react";
import { SearchForm } from "./forms/SearchForm";
import { Link } from "react-router-dom";
import { Box, Image, Icon, SimpleGrid, Skeleton } from "@chakra-ui/core/dist";

interface Movies {
  id: number;
  title: string;
  slug: string;
  picture_url: string;
  avg: number;
  genres: string;
  length: string;
  count: number;
}

export const MovieCards: React.FC = () => {
  const [movies, setMovies] = useState<Movies[]>([]);
  const [isLoading, setLoading] = useState<boolean>(true);

  const handleResponse = (json: Movies[]) => {
    setLoading(false);
    setMovies(json);
  };

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    fetch("/api", {
      signal: signal,
      method: "GET",
    })
      .then((res) => res.json())
      .then((json) => handleResponse(json))
      .catch((err) => console.error(err));

    return () => {
      abortController.abort();
    };
  }, []);

  const handleSubmit = (movies: Movies[]) => {
    setMovies(movies);
  };

  return (
    <>
      <SearchForm onSearch={handleSubmit} />
      <SimpleGrid
        mt="4"
        justifyItems="center"
        columns={{ sm: 1, md: 2, lg: 3 }}
        spacingY="4"
      >
        {movies.map((movie) => (
          <Box
            minW="xs"
            maxW="xs"
            borderWidth="1px"
            rounded="lg"
            overflow="hidden"
            key={movie.id}
          >
            <Skeleton isLoaded={!isLoading}>
              <Link tabIndex={-1} to={`/movie/${movie.id}/${movie.slug}`}>
                <Image
                  minW="xs"
                  maxW="xs"
                  maxH="480px"
                  src={movie.picture_url}
                  alt="movie poster"
                />
              </Link>
            </Skeleton>

            <Box p="6">
              <Skeleton isLoaded={!isLoading}>
                <Box
                  color="gray.500"
                  fontWeight="semibold"
                  letterSpacing="wide"
                  fontSize="xs"
                  textTransform="uppercase"
                  mt="1"
                >
                  {movie.genres}
                </Box>
              </Skeleton>

              <Skeleton isLoaded={!isLoading}>
                <Box mt="1" fontWeight="semibold" lineHeight="tight">
                  <Link to={`/movie/${movie.id}/${movie.slug}`}>
                    {movie.title}
                  </Link>
                </Box>
              </Skeleton>

              <Skeleton isLoaded={!isLoading}>
                <Box mt="1">{movie.length}</Box>
              </Skeleton>

              <Skeleton isLoaded={!isLoading}>
                <Box d="flex" mt="1" alignItems="center">
                  <Icon name="star" color="yellow.500" />
                  <Box ml="2">{movie.avg.toString().substr(0, 4)}</Box>
                  <Box as="span" ml="1" color="gray.600" fontSize="sm">
                    ({movie.count} reviews)
                  </Box>
                </Box>
              </Skeleton>
            </Box>
          </Box>
        ))}
      </SimpleGrid>
    </>
  );
};
