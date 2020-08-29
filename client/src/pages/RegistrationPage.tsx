import React, { useState } from "react";
import { LoginForm } from "../components/registration/forms/LoginForm";
import { SignUpForm } from "../components/registration/forms/SignUpForm";
import { CustomRadio } from "../components/registration/CustomRadio";
import { Header } from "../components/header/Header";
import { RadioButtonGroup } from "@chakra-ui/core";

export const RegistrationPage: React.FC = () => {
  const [currentView, setView] = useState<string | number | undefined>(
    "LOG_IN"
  );

  const handleChange = (val: string | number | undefined) => {
    setView(val);
  };

  return (
    <div>
      <Header />

      <RadioButtonGroup
        mt="4"
        defaultValue="LOG_IN"
        onChange={(val) => handleChange(val)}
        isInline
      >
        <CustomRadio value="LOG_IN">Log In</CustomRadio>
        <CustomRadio value="SIGN_UP">Sign Up</CustomRadio>
      </RadioButtonGroup>

      {currentView === "LOG_IN" ? <LoginForm /> : <SignUpForm />}
    </div>
  );
};
