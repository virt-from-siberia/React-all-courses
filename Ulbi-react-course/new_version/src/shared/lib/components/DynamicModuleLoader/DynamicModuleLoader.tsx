import { FC, useEffect } from "react";
import { useStore } from "react-redux";
import { Reducer } from "@reduxjs/toolkit";

import { ReduxStoreWithManager } from "app/providers/StoreProvider";
import { useAppDispatch } from "app/providers/StoreProvider/config/store";
import { StateSchemaKey } from "app/providers/StoreProvider/config/stateSchema";

export type ReducersList = {
  [name in StateSchemaKey]?: Reducer;
};

type ReducersListEntry = [StateSchemaKey, Reducer];

interface DynamicModuleLoaderProps {
  children: React.ReactNode;
  reducers: ReducersList;
  removeAfterUnmount?: boolean;
}

export const DynamicModuleLoader: FC<DynamicModuleLoaderProps> = (props) => {
  const { children, removeAfterUnmount, reducers } = props;
  const dispatch = useAppDispatch();
  const store = useStore() as ReduxStoreWithManager;

  useEffect(() => {
    Object.entries(reducers).forEach(([name, reducer]: ReducersListEntry) => {
      store.reducerManager.add(name, reducer);
      dispatch({ type: `@INIT ${name} reducer` });
    });

    return () => {
      if (removeAfterUnmount) {
        Object.entries(reducers).forEach(
          ([name, reducer]: ReducersListEntry) => {
            store.reducerManager.remove(name);
            dispatch({ type: `@DESTROY ${name} reducer` });
          }
        );
      }
    };
  }, []);

  return <>{children}</>;
};
