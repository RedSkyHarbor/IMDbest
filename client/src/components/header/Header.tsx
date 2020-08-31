import React from "react";
import { Login } from "../registration/Login";
import { Logout } from "../registration/Logout";
import { Logo } from "./Logo";
import { PseudoBox, Heading, Flex } from "@chakra-ui/core";

export const Header = (props: any) => {
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="1.5rem"
      bg="teal.500"
      color="white"
      {...props}
    >
      <PseudoBox _hover={{ fontStyle: "italic" }} mr={5}>
        <Heading as="h1" size="lg">
          <Logo />
        </Heading>
      </PseudoBox>

      <PseudoBox
        rounded="md"
        px={2}
        py={1}
        _hover={{ bg: "teal.200" }}
        fontWeight="semibold"
      >
        {localStorage.getItem("auth-token") ? <Logout /> : <Login />}
      </PseudoBox>
    </Flex>
  );
};
