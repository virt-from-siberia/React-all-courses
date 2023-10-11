import { ReactNode } from "react";
import { Provider } from "react-redux";
import { createReduxStore } from "../config/store";
import { StateSchema } from "../config/stateSchema";

interface StoreProviderProps {
  children?: ReactNode;
  initialState?: StateSchema;
}

export const StoreProvider: React.FC<StoreProviderProps> = ({ children }) => {
  const store = createReduxStore();

  return <Provider store={store}>{children}</Provider>;
};
