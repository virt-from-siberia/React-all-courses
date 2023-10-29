import { useContext, useState } from "react";
import { Context } from "../index";

export const LoginForm: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { store } = useContext(Context);

  const handleChangeEmail = (value: string) => setEmail(value);
  const handleChangePassword = (value: string) => setPassword(value);

  return (
    <div>
      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => handleChangeEmail(e.target.value)}
      />
      <input
        type="text"
        placeholder="Password"
        value={password}
        onChange={(e) => handleChangePassword(e.target.value)}
      />
      <button onClick={() => store.login(email, password)}>Login</button>
      <button onClick={() => store.registration(email, password)}>
        Registration
      </button>
    </div>
  );
};
