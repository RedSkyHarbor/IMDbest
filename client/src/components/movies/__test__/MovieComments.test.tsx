import React from "react";
import { render } from "@testing-library/react";
import { MovieComments } from "../MovieComments";
import { ThemeProvider } from "@chakra-ui/core";
import { renderWithTheme } from "../../../setupTestUtils";

describe("<MovieComments />", () => {
  it("smoke test", () => {
    renderWithTheme(<MovieComments movie_id="1" />);
  });
});
