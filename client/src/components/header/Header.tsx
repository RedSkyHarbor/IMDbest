import React from "react";
import { Login } from "../registration/Login";
import { Logout } from "../registration/Logout";
import { Logo } from "./Logo";
import { Box, Heading, Flex, Text, Button } from "@chakra-ui/core";

const MenuItems = ({ children }: any) => (
  <Text mt={{ base: 4, md: 0 }} mr={6} display="block">
    {children}
  </Text>
);

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
      <Flex align="center" mr={5}>
        <Heading as="h1" size="lg">
          <Logo />
        </Heading>
      </Flex>

      <Box>
        <Button bg="transparent" border="1px">
          {localStorage.getItem("auth-token") ? <Logout /> : <Login />}
        </Button>
      </Box>
    </Flex>
  );
};
