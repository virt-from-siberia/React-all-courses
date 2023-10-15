import { StateSchema } from "app/providers/StoreProvider/config/stateSchema";

export const getLoginLoading = (state: StateSchema) =>
  state?.loginForm?.isLoading || false;
