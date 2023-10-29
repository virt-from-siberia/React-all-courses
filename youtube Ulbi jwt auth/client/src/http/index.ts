// import axios from "axios";
// import { AuthResponse } from "../models/response/AuthResponse";

// export const API_URL = "http://localhost:5000/api";

// const $api = axios.create({
//   withCredentials: true,
//   baseURL: API_URL,
// });

// $api.interceptors.request.use((config) => {
//   config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
//   return config;
// });

// $api.interceptors.request.use(
//   (config) => {
//     return config;
//   },
//   async (error) => {
//     console.log("EEEROR AXIOS INTERCEPTOR");
//     const originalRequest = error.config;

//     if (error.response.status === 401) {
//       try {
//         const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, {
//           withCredentials: true,
//         });
//         localStorage.setItem("token", response.data.accessToken);

//         return $api.request(originalRequest);
//       } catch (error) {
//         console.log("Не авторизирован");
//       }
//     }
//   }
// );

// export default $api;

import axios from "axios";
import { AuthResponse } from "../models/response/AuthResponse";

export const API_URL = `http://localhost:5000/api`;

const $api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

$api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  return config;
});

$api.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response.status == 401 &&
      error.config &&
      !error.config._isRetry
    ) {
      originalRequest._isRetry = true;
      try {
        // TODO: В этом блоке нужно сделать при 401й ошибке на refresh выводить окно логина так как refresh token протух
        const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, {
          withCredentials: true,
        });
        localStorage.setItem("token", response.data.accessToken);
        return $api.request(originalRequest);
      } catch (e) {
        console.log("НЕ АВТОРИЗОВАН");
      }
    }
    throw error;
  }
);

export default $api;
