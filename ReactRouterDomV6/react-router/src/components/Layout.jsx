import { NavLink, Link, Outlet } from "react-router-dom";

export const Layout = () => {
  return (
    <>
      <header>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Home
        </NavLink>
        <NavLink to="/posts">Posts</NavLink>
        <NavLink to="/about">About</NavLink>
      </header>
      <main className="container">
        <Outlet />
      </main>

      <footer className="container">2023</footer>
    </>
  );
};
