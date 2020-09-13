import React from "react";
import { renderWithTheme } from "../../../setupTestUtils";
import { SignUpForm } from "../SignUpForm";
import { screen, fireEvent } from "@testing-library/react";

const mockLogin = jest.fn((email, password) => {
  return Promise.resolve({ email, password });
});

describe("<SignUpForm />", () => {
  beforeEach(() => {
    renderWithTheme(<SignUpForm />);
  });

  it("should display required error when inputs are empty", async () => {
    fireEvent.submit(screen.getByRole("button"));
    expect(await screen.findAllByRole("alert")).toHaveLength(3);
    expect(mockLogin).not.toBeCalled();
  });
});
