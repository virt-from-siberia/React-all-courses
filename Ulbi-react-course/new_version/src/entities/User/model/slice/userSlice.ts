import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { User, UserSchema } from "../types/user";
import { USER_LOCAL_STORAGE_KEY } from "shared/const/localstorage";

export const initialState: UserSchema = {};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    aetAuthData: (state, action: PayloadAction<User>) => {
      state.authData = action.payload;
    },
    initAuthData: (state, action: PayloadAction<User>) => {
      const user = localStorage.getItem(USER_LOCAL_STORAGE_KEY);
      if (user) state.authData = JSON.parse(user);
    },
    logout: (state, action: PayloadAction<User>) => {
      state.authData = undefined;
      localStorage.removeItem(USER_LOCAL_STORAGE_KEY);
    },
  },
});

export const { actions: userActions } = userSlice;
export const { reducer: userReducer } = userSlice;
