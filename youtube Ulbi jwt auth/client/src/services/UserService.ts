import { AxiosPromise } from "axios";

import $api from "../http";
import { IUser } from "../models/IUser";

export default class UserService {
  static async fetchUsers(): Promise<AxiosPromise<IUser[]>> {
    return $api.get<IUser[]>("/users");
  }
}
