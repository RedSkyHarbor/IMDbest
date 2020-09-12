import React from "react";
import { renderWithTheme } from "./setupTestUtils";
import App from "./App";

describe("<App />", () => {
  test("smoke test", () => {
    renderWithTheme(<App />);
  });
});
