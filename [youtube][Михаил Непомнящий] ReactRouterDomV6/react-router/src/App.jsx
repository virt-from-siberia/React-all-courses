import { Routes, Route, Link } from "react-router-dom";

import { AboutPage } from "./pages/AboutPage";
import { BlogPage } from "./pages/BlogPage";
import { HomePage } from "./pages/HomePage";
import { NotPoundPage } from "./pages/NotPoundPage";
import { SinglePage } from "./pages/SinglePage";
import { CreatePost } from "./pages/CreatePost";
import { EditPost } from "./pages/EditPost";

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
          <Route path="posts/:id" element={<SinglePage />} />
          <Route path="posts/:id/edit" element={<EditPost />} />
          <Route path="posts/new" element={<CreatePost />} />
          <Route path="*" element={<NotPoundPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
