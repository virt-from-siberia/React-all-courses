import { ICounterSchema } from "entities/Counter";
import { UserSchema } from "entities/User";

export interface StateSchema {
  counter: ICounterSchema;
  user: UserSchema;
}
