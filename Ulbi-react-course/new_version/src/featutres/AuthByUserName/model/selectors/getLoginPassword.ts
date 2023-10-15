import { StateSchema } from "app/providers/StoreProvider/config/stateSchema";

export const getLoginPassword = (state: StateSchema) =>
  state?.loginForm?.password || "";
