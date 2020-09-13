import React, { useState } from "react";
import { LoginForm } from "../components/forms/LoginForm";
import { SignUpForm } from "../components/forms/SignUpForm";
import { CustomRadio } from "../components/registration/CustomRadio";
import { Header } from "../components/header/Header";
import { Flex, Box, RadioButtonGroup } from "@chakra-ui/core";

export const RegistrationPage: React.FC = () => {
  const [currentView, setView] = useState<string | number | undefined>(
    "LOG_IN"
  );

  const handleChange = (val: string | number | undefined) => {
    setView(val);
  };

  return (
    <>
      <Header />

      <Flex justifyContent="center" alignItems="center">
        <RadioButtonGroup
          mt="4"
          defaultValue="LOG_IN"
          onChange={(val) => handleChange(val)}
          isInline
        >
          <CustomRadio value="LOG_IN">Log In</CustomRadio>
          <CustomRadio value="SIGN_UP">Sign Up</CustomRadio>
        </RadioButtonGroup>
      </Flex>

      <Box mt="2" ml="1.5rem" mr="1.5rem">
        {currentView === "LOG_IN" ? <LoginForm /> : <SignUpForm />}
      </Box>
    </>
  );
};
