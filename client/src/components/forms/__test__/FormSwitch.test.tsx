import React from "react";
import { FormSwitch } from "../FormSwitch";
import { renderWithTheme } from "../../../setupTestUtils";

describe("<CommentForm />", () => {
  it("smoke test", () => {
    renderWithTheme(<FormSwitch movie_id="1" />);
  });
});
