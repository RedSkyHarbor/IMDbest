import React from "react";
import { Header } from "../Header";
import { MemoryRouter } from "react-router-dom";
import { renderWithTheme } from "../../../setupTestUtils";

describe("<Header />", () => {
  it("smoke test", () => {
    renderWithTheme(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
  });
});
