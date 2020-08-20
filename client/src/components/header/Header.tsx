import React from "react";
import { Login } from "../registration/Login";
import { Logout } from "../registration/Logout";
import { Logo } from "./Logo";

export const Header: React.FC = () => {
  return (
    <header>
      <Logo />
      <br />
      {localStorage.getItem("auth-token") ? <Logout /> : <Login />}
    </header>
  );
};
