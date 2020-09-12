import React from "react";
import { MovieDetails } from "../MovieDetails";
import { MemoryRouter } from "react-router-dom";
import { renderWithTheme } from "../../../setupTestUtils";

describe("<MovieDetails />", () => {
  it("smoke test", () => {
    renderWithTheme(
      <MemoryRouter>
        <MovieDetails movie_id="1" />
      </MemoryRouter>
    );
  });
});
