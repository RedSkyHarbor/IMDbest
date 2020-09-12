import React from "react";
import { renderWithTheme } from "../../../setupTestUtils";
import { UpdateCommentForm } from "../UpdateCommentForm";

describe("<UpdateCommentForm />", () => {
  it("smoke test", () => {
    renderWithTheme(
      <UpdateCommentForm
        movie_id="1"
        comment="test comment"
        rating={10}
        headline="test headline"
      />
    );
  });
});
