import { useState } from "react";

import { YouTubeForm } from "./components/YoutubeForm.js";

import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <YouTubeForm />
      </div>
    </>
  );
}

export default App;
