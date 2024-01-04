import { useState } from "react";
import { signal, effect } from "@preact/signals-react";

const LOCAL_KEY = "TODOS";

export const todos = signal(getTodos());

const testSignal = signal("");

function getTodos() {
  const value = localStorage.getItem(LOCAL_KEY);
  if (value == null) return [];
  return JSON.parse(value);
}

effect(() => {
  localStorage.setItem(LOCAL_KEY, JSON.stringify(todos.value));
});

export const TodoList = () => {
  console.log("Render TodoList");

  // const [todos, setTodos] = useState(() => {
  //   const value = localStorage.getItem(LOCAL_KEY);
  //   if (value == null) return [];
  //   return JSON.parse(value);
  // });

  // useEffect(() => {
  //   localStorage.setItem(LOCAL_KEY, JSON.stringify(todos));
  // }, [todos]);

  const [newTodoName, setNewTodoName] = useState("");

  function addTodo(e) {
    e.preventDefault();

    todos.value = [
      ...todos.value,
      { id: crypto.randomUUID(), name: newTodoName, completed: false },
    ];

    setNewTodoName("");
  }

  function toggleTodo(id, completed) {
    todos.value = todos.value.map((todo) => {
      if (todo.id === id) {
        return { ...todo, completed };
      }
      return todo;
    });
  }

  return (
    <>
      <h1>{name.value}</h1>
      <input
        type="text"
        value={testSignal.value}
        onChange={(e) => {
          testSignal.value = e.target.value;
        }}
      />
      <form onSubmit={addTodo}>
        <label>New Task</label>
        <input
          type="text"
          value={newTodoName}
          onChange={(e) => setNewTodoName(e.target.value)}
        />
        <button>Add</button>
      </form>
      <p>{testSignal.value}</p>
      <ul>
        {todos.value.map((todo) => (
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
