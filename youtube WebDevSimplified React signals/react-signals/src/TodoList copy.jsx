/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

const LOCAL_KEY = "TODOS";

export const TodoList = ({ addTodo, toggleTodo, todos }) => {
  console.log("Render TodoList");

  const [newTodoName, setNewTodoName] = useState("");

  function handleSubmit(e) {
    e.preventDefault;
    addTodo(newTodoName);
    setNewTodoName("");
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>New Task</label>
        <input
          type="text"
          value={newTodoName}
          onChange={(e) => setNewTodoName(e.target.value)}
        />
        <button>Add</button>
      </form>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <label>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={(e) => toggleTodo(todo.id, e.target.checked)}
              />
              {todo.name}
            </label>
          </li>
        ))}
      </ul>
    </>
  );
};
