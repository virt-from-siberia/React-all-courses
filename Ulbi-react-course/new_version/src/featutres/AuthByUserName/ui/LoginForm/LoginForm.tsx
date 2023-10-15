import { memo, useCallback, useEffect } from "react";
import { useSelector, useStore } from "react-redux";

import { useAppDispatch } from "app/providers/StoreProvider/config/store";
import {
  loginActions,
  loginReducer,
} from "featutres/AuthByUserName/model/slice/loginSlice";
import { loginByUsername } from "featutres/AuthByUserName/model/services/loginByUsername";

import { Button } from "shared/ui/Button";
import { Input } from "shared/ui/Input/Input";
import {
  DynamicModuleLoader,
  ReducersList,
} from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";

import { getLoginUsername } from "featutres/AuthByUserName/model/selectors/getLoginUsername";
import { getLoginPassword } from "featutres/AuthByUserName/model/selectors/getLoginPassword";
import { getLoginLoading } from "featutres/AuthByUserName/model/selectors/getLoginLoading";

export interface LoginFormProps {
  className?: string;
}

const initialReducers: ReducersList = {
  loginForm: loginReducer,
};

const LoginForm = memo((props: LoginFormProps) => {
  const dispatch = useAppDispatch();
  const username = useSelector(getLoginUsername);
  const password = useSelector(getLoginPassword);
  const isLoading = useSelector(getLoginLoading);

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
    <DynamicModuleLoader reducers={initialReducers} removeAfterUnmount>
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
    </DynamicModuleLoader>
  );
});

export default LoginForm;
