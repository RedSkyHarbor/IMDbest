import React from "react";
import { render } from "@testing-library/react";
import { MovieDetails } from "../MovieDetails";
import { ThemeProvider } from "@chakra-ui/core";
import { MemoryRouter } from "react-router-dom";

describe("<MovieDetails />", () => {
  it("smoke test", () => {
    render(
      <ThemeProvider>
        <MemoryRouter>
          <MovieDetails movie_id="1" />
        </MemoryRouter>
      </ThemeProvider>
    );
  });
});
