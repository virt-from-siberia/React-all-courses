import { StateSchema } from "app/providers/StoreProvider/config/stateSchema";

export const getLoginState = (state: StateSchema) => state?.loginForm;
