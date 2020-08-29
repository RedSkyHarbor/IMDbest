import React, { useState, useEffect } from "react";
import { SearchForm } from "./forms/SearchForm";
import { Box, Image, Icon, SimpleGrid, Skeleton } from "@chakra-ui/core/dist";
import { LinkButton } from "../reusable/LinkButton";

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
    setTimeout(() => setLoading(false), 2000);
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

  const setLocalStorage = (id: string) => {
    localStorage.setItem("movie_id", id);
  };

  const handleSubmit = (movies: Movies[]) => {
    setMovies(movies);
  };

  return (
    <>
      <SearchForm onSearch={handleSubmit} />
      {/* TODO Want to reduce columns to 2 at 1152px */}
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
              <Image
                minW="xs"
                maxW="xs"
                maxH="480px"
                src={movie.picture_url}
                alt="movie poster"
              />
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
                <LinkButton
                  onClick={() => setLocalStorage(movie.id.toString())}
                  to={`/movie/${movie.slug}`}
                  variant="link"
                  variantColor="gray:400"
                  mt="1"
                  fontWeight="semibold"
                  lineHeight="tight"
                >
                  {movie.title}
                </LinkButton>
              </Skeleton>
              <Skeleton isLoaded={!isLoading}>
                <Box mt="1">{movie.length}</Box>
              </Skeleton>
              <Skeleton isLoaded={!isLoading}>
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
              </Skeleton>
            </Box>
          </Box>
        ))}
      </SimpleGrid>
    </>
  );
};
