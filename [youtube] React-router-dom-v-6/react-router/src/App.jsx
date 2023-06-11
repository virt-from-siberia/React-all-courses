import { Routes, Route, Link } from "react-router-dom";

import { AboutPage } from "./pages/AboutPage";
import { BlogPage } from "./pages/BlogPage";
import { HomePage } from "./pages/HomePage";
import { NotPoundPage } from "./pages/NotPoundPage";

import { Layout } from "./components/Layout";

import "./App.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="posts" element={<BlogPage />} />
          <Route path="*" element={<NotPoundPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
