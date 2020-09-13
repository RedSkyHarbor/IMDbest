import { fireEvent } from "@testing-library/react";
import React from "react";
import { renderWithTheme } from "../../../setupTestUtils";
import { LoginForm } from "../LoginForm";
import { screen } from "@testing-library/react";

const mockLogin = jest.fn((email, password) => {
  return Promise.resolve({ email, password });
});

describe("<LoginForm />", () => {
  beforeEach(() => {
    renderWithTheme(<LoginForm />);
  });

  it("should display required error when inputs are empty", async () => {
    fireEvent.submit(screen.getByRole("button"));
    expect(await screen.findAllByRole("alert")).toHaveLength(2);
    expect(mockLogin).not.toBeCalled();
  });
});
