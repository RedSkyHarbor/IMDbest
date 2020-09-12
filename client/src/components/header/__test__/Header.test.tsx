import React from "react";
import { render } from "@testing-library/react";
import { Header } from "../Header";
import { MemoryRouter } from "react-router-dom";

describe("<Header />", () => {
  it("smoke test", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
  });
});
