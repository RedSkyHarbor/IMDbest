import React from "react";
import { useForm } from "react-hook-form";
import {
  Box,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  FormControl,
  Input,
  Select,
  Icon,
} from "@chakra-ui/core/dist";

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
    <Box pt="4" margin="auto" width="50%">
      <form onSubmit={onSubmit}>
        <FormControl>
          <InputGroup size="md">
            <InputLeftElement
              children={<Icon name="search" color="gray.300" />}
            />
            <Input
              name="title"
              placeholder="Search IMDbest"
              type="text"
              ref={register}
            />
            <InputRightElement
              children={
                <Select onChange={onSubmit} name="order" ref={register}>
                  <option value="asc">Avg rating ascending</option>
                  <option value="desc">Avg rating descending</option>
                </Select>
              }
            />
          </InputGroup>
        </FormControl>
      </form>
    </Box>
  );
};
