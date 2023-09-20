import { useState } from "react";

import { YouTubeForm } from "./components/YoutubeForm.js";

import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <YouTubeForm />
      </div>
    </>
  );
}

export default App;
