import React from "react";
import { NavLink, Link, useMatch } from "react-router-dom";

export const CustomLink = ({ children, to, ...rest }) => {
  const match = useMatch();

  return (
    <Link to={to} {...rest}>
      {children}
    </Link>
  );
};
