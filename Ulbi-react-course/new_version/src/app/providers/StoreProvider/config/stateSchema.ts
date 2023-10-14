import { ICounterSchema } from "entities/Counter";
import { UserSchema } from "entities/User";
import { LoginSchema } from "featutres/AuthByUserName";

export interface StateSchema {
  counter: ICounterSchema;
  user: UserSchema;
  loginForm: LoginSchema;
}
