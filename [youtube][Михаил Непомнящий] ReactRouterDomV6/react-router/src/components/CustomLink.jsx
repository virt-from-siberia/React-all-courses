import React from "react";
import { NavLink, Link, useMatch } from "react-router-dom";

export const CustomLink = ({ children, to, ...rest }) => {
  const match = useMatch(to);

  console.log("match", { match });

  return (
    <Link
      to={to}
      {...rest}
      style={{
        color: match ? "var(--color-active)" : "white",
      }}
    >
      {children}
    </Link>
  );
};
