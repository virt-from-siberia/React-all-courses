import axios from "axios";
import { USER_LOCAL_STORAGE_KEY } from "shared/const/localstorage";

// const baseUrl = __IS_DEV__ ? "http://localhost:8000" : "http://localhost:8000";

export const $api = axios.create({
  baseURL: __API__,
  headers: {
    authorization: localStorage.getItem(USER_LOCAL_STORAGE_KEY),
  },
});
