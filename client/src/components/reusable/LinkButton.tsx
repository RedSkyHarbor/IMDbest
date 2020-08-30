import React from "react";

import {
  Link as ReactRouterLink,
  LinkProps as RouterLinkProps,
} from "react-router-dom";
import { Button as ChakraButton, ButtonProps } from "@chakra-ui/core/dist/";

type LinkButtonProps = ButtonProps & RouterLinkProps;

export const LinkButton: React.FC<LinkButtonProps> = React.forwardRef(
  (props: LinkButtonProps, ref: React.Ref<any>) => {
    return <ChakraButton ref={ref} as={ReactRouterLink} {...props} />;
  }
);
