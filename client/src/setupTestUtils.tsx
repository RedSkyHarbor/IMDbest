import React from "react";
import { render } from "@testing-library/react";
import { ThemeProvider } from "@chakra-ui/core/dist";

export const renderWithTheme = (ui: any) => {
  const Wrapper = ({ children }: any) => (
    <ThemeProvider>{children}</ThemeProvider>
  );

  return render(ui, { wrapper: Wrapper });
};
