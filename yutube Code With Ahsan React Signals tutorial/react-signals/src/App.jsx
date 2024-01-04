import { signal } from "@preact/signals-react";

import { Header } from "./Header";
import { Home } from "./Home";

import "./App.css";

const count = signal(0);

function App() {
  return (
    <div className="app">
      <Header />
      <Home />
    </div>
  );
}

export default App;
