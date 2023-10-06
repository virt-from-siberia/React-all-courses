import { createRoot } from "react-dom/client";
import { Counter } from "./components/Counter";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <div>
    <h1>Hello, world!!!!</h1>
    <Counter />
  </div>
);
