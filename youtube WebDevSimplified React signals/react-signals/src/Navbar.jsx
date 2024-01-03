import { todos } from "./TodoList";

export const Navbar = () => {
  console.log("Render Navbar");

  return (
    <nav className="navbar">
      <div>
        completed: {todos.value.filter((todo) => todo.completed).length}
      </div>
      <a href="/">Todos</a>
      <a href="/account">Account</a>
    </nav>
  );
};
