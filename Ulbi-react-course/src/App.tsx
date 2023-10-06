import { Suspense } from "react";
import { Route, Routes, Link } from "react-router-dom";

import { MainPage } from "./pages/MainPage/MainPage.async";
import { AboutPage } from "./pages/AboutPage/AboutPage.async";

import "./styles/index.scss";

export const App = () => {
  return (
    <div className="app dark">
      <Link to={"/"}>Главная</Link>
      <Link to={"/about"}>О сайте</Link>
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
