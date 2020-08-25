import React, { useState } from "react";
import { LoginForm } from "../components/registration/forms/LoginForm";
import { SignUpForm } from "../components/registration/forms/SignUpForm";
import { Header } from "../components/header/Header";

export const RegistrationPage: React.FC = () => {
  const [currentView, setView] = useState<string>("SIGN_UP");
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setView(event.currentTarget.title);
  };

  return (
    <div>
      <Header />
      <button title="LOG_IN" onClick={handleClick}>
        Log in
      </button>
      <button title="SIGN_UP" onClick={handleClick}>
        Sign Up
      </button>
      {currentView === "LOG_IN" ? <LoginForm /> : <SignUpForm />}
    </div>
  );
};
