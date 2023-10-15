import { FC, useEffect } from "react";
import { useStore } from "react-redux";
import { Reducer } from "@reduxjs/toolkit";

import { ReduxStoreWithManager } from "app/providers/StoreProvider";
import { useAppDispatch } from "app/providers/StoreProvider/config/store";
import { StateSchemaKey } from "app/providers/StoreProvider/config/stateSchema";

interface DynamicModuleLoaderProps {
  children: React.ReactNode;
  name: StateSchemaKey;
  reducer: Reducer;
}

export const DynamicModuleLoader: FC<DynamicModuleLoaderProps> = (props) => {
  const { children, name, reducer } = props;
  const dispatch = useAppDispatch();
  const store = useStore() as ReduxStoreWithManager;

  useEffect(() => {
    store.reducerManager.add(name, reducer);
    dispatch({ type: `@INIT ${name} reducer` });
    return () => {
      store.reducerManager.remove(name);
      dispatch({ type: `@DESTROY ${name} reducer` });
    };
  }, []);

  return <>{children}</>;
};
