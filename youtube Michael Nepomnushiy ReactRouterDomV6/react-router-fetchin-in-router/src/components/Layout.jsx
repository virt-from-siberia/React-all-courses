import { Outlet } from "react-router-dom";
import { CustomLink } from "../components/CustomLink";

export const Layout = () => {
  return (
    <>
      <header>
        <CustomLink to="/">Home</CustomLink>
        <CustomLink to="/posts">Posts</CustomLink>
        <CustomLink to="/about">About</CustomLink>
      </header>
      <main className="container">
        <Outlet />
      </main>

      <footer className="container">2023</footer>
    </>
  );
};
