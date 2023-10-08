import { Suspense } from "react";
import { Route, Routes, Link } from "react-router-dom";

import { MainPage } from "pages/MainPage/MainPage.async";
import { AboutPage } from "pages/AboutPage/AboutPage.async";

import "./styles/index.scss";

import { useTheme } from "./providers/ThemeProvider";
import { classNames } from "../helpers/classNames";

export enum Theme {
  LIGHT = "light",
  DARK = "dark",
}

export const App = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={classNames("app", {}, [theme])}>
      <div className="actions">
        <button onClick={toggleTheme}>Toggle theme</button>
        <Link to={"/"}>Главная</Link>
        <Link to={"/about"}>О сайте</Link>
      </div>
      Hello world
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path={"./"} element={<MainPage />} />
          <Route path={"./about"} element={<AboutPage />} />
        </Routes>
      </Suspense>
    </div>
  );
};