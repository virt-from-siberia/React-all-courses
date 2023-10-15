import { StateSchema } from "app/providers/StoreProvider/config/stateSchema";

export const getLoginUsername = (state: StateSchema) =>
  state?.loginForm?.username || "";
