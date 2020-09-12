import React from "react";
import { CommentForm } from "../CommentForm";
import { renderWithTheme } from "../../../setupTestUtils";

describe("<CommentForm />", () => {
  it("smoke test", () => {
    renderWithTheme(<CommentForm movie_id="1" />);
  });
});
