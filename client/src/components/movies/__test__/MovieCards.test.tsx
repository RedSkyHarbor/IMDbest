import React from "react";
import { render } from "@testing-library/react";
import { ThemeProvider } from "@chakra-ui/core";
import { MemoryRouter } from "react-router-dom";
import { MovieCards } from "../MovieCards";
import { renderWithTheme } from "../../../setupTestUtils";

describe("<MovieCards />", () => {
  it("smoke test", () => {
    renderWithTheme(
      <MemoryRouter>
        <MovieCards />
      </MemoryRouter>
    );
  });
});
