import "./App.css";

import { useState, useEffect } from "react";
import logo from "./logo.svg";

function App() {
  const [data, setData] = useState();

  useEffect(() => {
    setTimeout(() => {
      setData(100);
    }, 100);
  }, []);

  return (
    <div>
      <h1>Hello world</h1>
      {data && <div style={{ color: "red" }}>data</div>}
      <button>click me</button>
      <input placeholder="input value..." type="text" />
    </div>
  );
}

export default App;
