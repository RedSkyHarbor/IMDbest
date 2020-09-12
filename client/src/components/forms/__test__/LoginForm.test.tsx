import React from "react";
import { renderWithTheme } from "../../../setupTestUtils";
import { LoginForm } from "../LoginForm";

describe("<LoginForm />", () => {
  it("smoke test", () => {
    renderWithTheme(<LoginForm />);
  });
});
