import { NavLink, Link, Outlet } from "react-router-dom";

export const Layout = () => {
  return (
    <>
      <header>
        <Link to="/">Home</Link>
        <Link to="/posts">Blog</Link>
        <Link to="/about">About</Link>
      </header>
      <main className="container">
        <Outlet />
      </main>

      <footer className="container">2023</footer>
    </>
  );
};
