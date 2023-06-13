import { Outlet, Link } from "react-router-dom";

export const AboutPage = () => {
  return (
    <>
      <h1>AboutPage</h1>
      <ul>
        <li>
          <Link to="contacts">contacts</Link>
        </li>
        <li>
          <Link to="team">team</Link>
        </li>
      </ul>

      {/* <Routes>
        <Route path="contacts" element={<p>our contacts</p>} />
        <Route path="team" element={<p>our team</p>} />
      </Routes> */}
      <Outlet />
    </>
  );
};
