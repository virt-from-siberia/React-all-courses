import React from "react";
import { Link, useMatch } from "react-router-dom";

export const CustomLink = ({ children, to, ...rest }) => {
  const match = useMatch({ path: to, end: to.length === 1 });

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
