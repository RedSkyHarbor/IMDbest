import React from "react";
import { LoginForm } from "../components/registration/forms/LoginForm";
import { SignUpForm } from "../components/registration/forms/SignUpForm";

export const RegistrationPage: React.FC = () => {
  return (
    <div>
      <LoginForm />
      <SignUpForm />
    </div>
  );
};
