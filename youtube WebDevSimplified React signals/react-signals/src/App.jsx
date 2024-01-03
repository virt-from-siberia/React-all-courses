import { useState } from "react";

import { Navbar } from "./Navbar";
import { TodoList } from "./TodoList";
import { Sidebar } from "./Sidebar";

import "./App.css";

function App() {
  console.log("Render App");
  const [count, setCount] = useState(0);

  return (
    <div className="wrapper">
      <Navbar />
      <main>
        <TodoList />
      </main>
      <Sidebar />
    </div>
  );
}

export default App;
