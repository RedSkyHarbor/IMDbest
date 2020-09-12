import React from "react";
import { render } from "@testing-library/react";
import { ThemeProvider } from "@chakra-ui/core";
import { MemoryRouter } from "react-router-dom";
import { MovieCards } from "../MovieCards";

describe("<MovieCards />", () => {
  it("smoke test", () => {
    render(
      <ThemeProvider>
        <MemoryRouter>
          <MovieCards />
        </MemoryRouter>
      </ThemeProvider>
    );
  });
});
