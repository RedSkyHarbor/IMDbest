import React from "react";
import { LoginForm } from "../components/registration/forms/LoginForm";
import { SignUpForm } from "../components/registration/forms/SignUpForm";
import { Header } from "../components/header/Header";

export const RegistrationPage: React.FC = () => {
  return (
    <div>
      <Header />
      <LoginForm />
      <SignUpForm />
    </div>
  );
};
