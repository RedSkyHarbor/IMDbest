import React from "react";
import { Login } from "../registration/Login";
import { Logo } from "./Logo";

export const Header: React.FC = () => {
  return (
    <header>
      <Logo />
      <br />
      <Login />
    </header>
  );
};
