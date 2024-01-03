import { useState, useEffect } from "react";

import { Navbar } from "./Navbar";
import { TodoList } from "./TodoList";
import { Sidebar } from "./Sidebar";

import "./App.css";

const LOCAL_KEY = "TODOS";

function App() {
  console.log("Render App");

  const [todos, setTodos] = useState(() => {
    const value = localStorage.getItem(LOCAL_KEY);
    if (value == null) return [];
    return JSON.parse(value);
  });

  useEffect(() => {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(todos));
  }, [todos]);

  function addTodo(name) {
    setTodos((prevTodos) => {
      return [
        ...prevTodos,
        { id: crypto.randomUUID(), name, completed: false },
      ];
    });
    // setNewTodoName("");
  }

  function toggleTodo(id, completed) {
    setTodos((prevTodos) => {
      return prevTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed };
        }
        return todo;
      });
    });
  }

  return (
    <div className="wrapper">
      <Navbar todos={todos} />
      <main>
        <TodoList addTodo={addTodo} toggleTodo={toggleTodo} todos={todos} />
      </main>
      <Sidebar />
    </div>
  );
}

export default App;
