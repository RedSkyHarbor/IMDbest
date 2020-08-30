import React from "react";
import { Button } from "@chakra-ui/core";

interface RadioProps {
  isChecked?: boolean;
  isDisabled?: boolean;
  value?: string | number;
  children?: string;
}

export const CustomRadio = React.forwardRef((props: RadioProps, ref) => {
  const { isChecked, isDisabled, value, children, ...rest } = props;
  return (
    <Button
      ref={ref}
      variantColor={isChecked ? "teal" : "gray"}
      aria-checked={isChecked}
      role="radio"
      isDisabled={isDisabled}
      {...rest}
    >
      {children}
    </Button>
  );
});
