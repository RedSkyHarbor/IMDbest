import React, { useState } from "react";
import { LoginForm } from "../components/registration/forms/LoginForm";
import { SignUpForm } from "../components/registration/forms/SignUpForm";
import { Header } from "../components/header/Header";
import { Button } from "@chakra-ui/core";

export const RegistrationPage: React.FC = () => {
  const [currentView, setView] = useState<string>("SIGN_UP");
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setView(event.currentTarget.title);
  };

  return (
    <div>
      <Header />
      <Button title="LOG_IN" onClick={handleClick}>
        Log in
      </Button>
      <Button title="SIGN_UP" onClick={handleClick}>
        Sign Up
      </Button>
      {currentView === "LOG_IN" ? <LoginForm /> : <SignUpForm />}
    </div>
  );
};
