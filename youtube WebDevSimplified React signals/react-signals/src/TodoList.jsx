import { useEffect, useState } from "react";

const LOCAL_KEY = "TODOS";

export const TodoList = () => {
  console.log("Render TodoList");

  const [todos, setTodos] = useState(() => {
    const value = localStorage.getItem(LOCAL_KEY);
    if (value == null) return [];
    return JSON.parse(value);
  });

  const [newTodoName, setNewTodoName] = useState("");

  function addTodo(e) {
    e.preventDefault();

    setTodos((prevTodos) => {
      return [
        ...prevTodos,
        { id: crypto.randomUUID(), name: newTodoName, completed: false },
      ];
    });
  }

  setNewTodoName("");

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

  useEffect(() => {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(todos));
  }, [todos]);

  return (
    <>
      <form onSubmit={addTodo}>
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
                type="chekbox"
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
