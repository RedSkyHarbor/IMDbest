import React from "react";
import { render } from "@testing-library/react";
import { FormSwitch } from "../FormSwitch";
import { ThemeProvider } from "@chakra-ui/core";

describe("<CommentForm />", () => {
  it("smoke test", () => {
    render(
      <ThemeProvider>
        <FormSwitch movie_id="1" />
      </ThemeProvider>
    );
  });
});
