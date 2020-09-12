import React from "react";
import { render } from "@testing-library/react";
import { ThemeProvider } from "@chakra-ui/core/dist";

import App from "./App";

describe("<App />", () => {
  test("smoke test", () => {
    render(
      <ThemeProvider>
        <App />
      </ThemeProvider>
    );
  });
});
