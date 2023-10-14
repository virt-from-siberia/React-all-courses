import { Button } from "shared/ui/Button";
import { Input } from "shared/ui/Input/Input";

interface LoginFormProps {
  className?: string;
}

export const LoginForm = (props: LoginFormProps) => {
  const { className } = props;

  return (
    <div>
      <Input type="text" placeholder="Введите username" />
      <Input type="text" placeholder="Введите password" />
      <Button>Войти</Button>
    </div>
  );
};
