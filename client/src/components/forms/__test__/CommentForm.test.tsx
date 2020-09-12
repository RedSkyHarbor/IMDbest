import React from "react";
import { render } from "@testing-library/react";
import { CommentForm } from "../CommentForm";
import { ThemeProvider } from "@chakra-ui/core";

describe("<CommentForm />", () => {
  it("smoke test", () => {
    <ThemeProvider>
      <CommentForm movie_id="1" />
    </ThemeProvider>;
  });
});
