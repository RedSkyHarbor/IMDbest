import React from "react";
import { render } from "@testing-library/react";
import { MovieComments } from "../MovieComments";
import { ThemeProvider } from "@chakra-ui/core";

describe("<MovieComments />", () => {
  it("smoke test", () => {
    render(
      <ThemeProvider>
        <MovieComments movie_id="1" />
      </ThemeProvider>
    );
  });
});
