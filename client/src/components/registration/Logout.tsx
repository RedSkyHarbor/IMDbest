import React from "react";
import { Link } from "react-router-dom";

const handleLogout = () => {
  localStorage.removeItem("auth-token");
};

export const Logout: React.FC = () => {
  return (
    <Link to="/" onClick={handleLogout}>
      Log out
    </Link>
  );
};
