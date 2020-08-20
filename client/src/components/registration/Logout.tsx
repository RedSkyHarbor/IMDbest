import React from "react";
import { Link, useHistory } from "react-router-dom";

export const Logout: React.FC = () => {
  let history = useHistory();

  const handleLogout = () => {
    localStorage.removeItem("auth-token");
    localStorage.removeItem("movie_id");
    history.push("/");
  };

  return (
    <Link to="/" onClick={handleLogout}>
      Log out
    </Link>
  );
};
