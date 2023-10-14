import { memo, useCallback } from "react";
import { useSelector } from "react-redux";

import { useAppDispatch } from "app/providers/StoreProvider/config/store";
import { loginActions } from "featutres/AuthByUserName/model/slice/loginSlice";
import { getLoginState } from "featutres/AuthByUserName/model/selectors/getLoginState";

import { Button } from "shared/ui/Button";
import { Input } from "shared/ui/Input/Input";
import { loginByUsername } from "featutres/AuthByUserName/model/services/loginByUsername";

interface LoginFormProps {
  className?: string;
}

export const LoginForm = memo((props: LoginFormProps) => {
  const dispatch = useAppDispatch();
  const loginForm = useSelector(getLoginState);
  const { username, password, error, isLoading } = loginForm;

  const onChangeUsername = useCallback(
    (value: string) => {
      dispatch(loginActions.setUsername(value));
    },
    [dispatch]
  );

  const onChangePassword = useCallback(
    (value: string) => {
      dispatch(loginActions.setPassword(value));
    },
    [dispatch]
  );

  const onLoginClick = useCallback(() => {
    dispatch(loginByUsername({ username, password }));
  }, [dispatch, password, username]);

  return (
    <div>
      <Input
        type="text"
        placeholder="Введите username"
        onChange={onChangeUsername}
        value={username}
      />
      <Input
        type="text"
        placeholder="Введите password"
        onChange={onChangePassword}
        value={password}
      />
      <Button onClick={onLoginClick} disabled={isLoading}>
        Войти
      </Button>
    </div>
  );
});
