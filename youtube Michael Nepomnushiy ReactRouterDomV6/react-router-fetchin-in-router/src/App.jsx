import {
  Routes,
  Route,
  Navigate,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import { AboutPage } from "./pages/AboutPage";
import { BlogPage, blogLoader } from "./pages/BlogPage";
import { HomePage } from "./pages/HomePage";
import { NotPoundPage } from "./pages/NotPoundPage";
import { SinglePage, singlePostLoader } from "./pages/SinglePage";
import { CreatePost } from "./pages/CreatePost";
import { EditPost } from "./pages/EditPost";
import { LoginPage } from "./pages/LoginPage";

import { Layout } from "./components/Layout";

import { RequireAuth } from "./hoc/RequireAuth";
import { AuthProvider } from "./hoc/AuthProvider";

import "./App.css";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="" element={<Layout />}>
      <Route index element={<HomePage />} />

      <Route path="about*" element={<AboutPage />}>
        <Route path="contacts" element={<p>our contacts</p>} />
        <Route path="team" element={<p>our team</p>} />
      </Route>

      <Route path="about-us" element={<Navigate to="/about" replace />} />
      <Route path="posts" element={<BlogPage />} loader={blogLoader} />
      <Route
        path="posts/:id"
        element={<SinglePage />}
        loader={singlePostLoader}
      />
      <Route path="posts/:id/edit" element={<EditPost />} />
      <Route
        path="posts/new"
        element={
          <RequireAuth>
            <CreatePost />
          </RequireAuth>
        }
      />
      <Route path="login" element={<LoginPage />} />
      <Route path="*" element={<NotPoundPage />} />
    </Route>
  )
);

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </div>
  );
}

export default App;
