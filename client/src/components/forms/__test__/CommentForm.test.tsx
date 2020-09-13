import React from "react";
import { CommentForm } from "../CommentForm";
import { renderWithTheme } from "../../../setupTestUtils";
import { screen, fireEvent } from "@testing-library/react";

const mockComment = jest.fn((comment, rating, headline) => {
  return Promise.resolve({ comment, rating, headline });
});

describe("<CommentForm />", () => {
  beforeEach(() => {
    renderWithTheme(<CommentForm movie_id="1" />);
  });

  it("should display required error when inputs are empty", async () => {
    fireEvent.submit(screen.getByRole("button"));
    expect(await screen.findAllByRole("alert")).toHaveLength(3);
    expect(mockComment).not.toBeCalled();
  });
});
