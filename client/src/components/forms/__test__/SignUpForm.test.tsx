import React from "react";
import { renderWithTheme } from "../../../setupTestUtils";
import { SignUpForm } from "../SignUpForm";

describe("<SignUpForm />", () => {
  it("smoke test", () => {
    renderWithTheme(<SignUpForm />);
  });
});
