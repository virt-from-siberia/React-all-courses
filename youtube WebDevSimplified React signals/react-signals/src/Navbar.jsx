import { computed } from "@preact/signals-react";
import { todos } from "./TodoList";

export const Navbar = () => {
  console.log("Render Navbar");

  const completedTodosCount = computed(() => {
    return todos.value.filter((todo) => todo.completed).length;
  });

  return (
    <nav className="navbar">
      <div>completed: {completedTodosCount}</div>
      <a href="/">Todos</a>
      <a href="/account">Account</a>
    </nav>
  );
};
