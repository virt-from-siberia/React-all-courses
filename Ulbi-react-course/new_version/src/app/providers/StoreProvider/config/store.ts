import { useDispatch } from "react-redux";
import { ReducersMapObject, configureStore } from "@reduxjs/toolkit";
import { StateSchema } from "./stateSchema";
import { counterReducer } from "entities/Counter";
import { userReducer } from "entities/User";
import { loginReducer } from "featutres/AuthByUserName/model/slice/loginSlice";

export function createReduxStore(initialState?: StateSchema) {
  const rootReducers: ReducersMapObject<StateSchema> = {
    counter: counterReducer,
    user: userReducer,
    loginForm: loginReducer,
  };

  const store = configureStore<StateSchema>({
    reducer: rootReducers,
    devTools: __IS_DEV__,
    preloadedState: initialState,
  });

  return store;
}

export const useAppDispatch = () =>
  useDispatch<ReturnType<typeof createReduxStore>["dispatch"]>();
