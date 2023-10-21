import { useDispatch } from "react-redux";
import { NavigateOptions, To } from "react-router-dom";
import { ReducersMapObject, configureStore } from "@reduxjs/toolkit";
import { StateSchema } from "./stateSchema";
import { counterReducer } from "entities/Counter";
import { userReducer } from "entities/User";
import { createReducerManager } from "./reducerManager";
import { $api } from "shared/api/api";

export function createReduxStore(
  initialState?: StateSchema,
  asyncReducers?: ReducersMapObject<StateSchema>,
  navigate?: (to: To, options?: NavigateOptions) => void
) {
  const rootReducers: ReducersMapObject<StateSchema> = {
    ...asyncReducers,
    counter: counterReducer,
    user: userReducer,
  };

  const reducerManager = createReducerManager(rootReducers);

  const store = configureStore({
    devTools: __IS_DEV__,
    reducer: reducerManager.reduce,
    preloadedState: initialState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: {
          extraArgument: {
            api: $api,
            navigate,
          },
        },
      }),
  });

  // @ts-ignore
  store.reducerManager = reducerManager;

  return store;
}

export const useAppDispatch = () =>
  useDispatch<ReturnType<typeof createReduxStore>["dispatch"]>();

export type AppDispatch = ReturnType<typeof createReduxStore>["dispatch"];
