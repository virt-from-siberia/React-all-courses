import { useContext, useEffect, useState } from "react";
import "./App.css";
import LoginForm from "./components/LoginForm";
import { Context } from ".";
import { observer } from "mobx-react-lite";
import { IUser } from "./models/IUser";
import UserService from "./services/UserService";

function App() {
  const { store } = useContext(Context);
  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("token", token);
    if (token) store.checkAuth();
  }, []);

  async function getUsers() {
    try {
      const response = await UserService.fetchUsers();
      setUsers(response.data);
    } catch (error) {
      console.log("error", error);
    }
  }

  if (store.isLoading) return <div>Загрузка...</div>;

  if (!store.isAuth) return <LoginForm />;

  return (
    <div className="App">
      <h1>
        {store.isAuth
          ? "Пользователь авторизован"
          : "Пользователь не авторизован"}
      </h1>
      <button onClick={() => store.logout()}>Выйти</button>
      <div>
        <button onClick={getUsers}>Получить список пользователей</button>
      </div>

      <div>
        {users.map((user) => (
          <div key={user.id}>{user.email}</div>
        ))}
      </div>
    </div>
  );
}

export default observer(App);
