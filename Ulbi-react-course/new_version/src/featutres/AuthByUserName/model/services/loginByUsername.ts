import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkExtraArg } from "app/providers/StoreProvider";

import { User, userActions } from "entities/User";
import { USER_LOCAL_STORAGE_KEY } from "shared/const/localstorage";

interface LoginByUsernameProps {
  username: string;
  password: string;
}

export const loginByUsername = createAsyncThunk<
  User,
  LoginByUsernameProps,
  { rejectValue: string; extra: ThunkExtraArg }
>("login/loginByUsername", async (authData, thunkApi) => {
  const { dispatch, extra, rejectWithValue } = thunkApi;

  try {
    const response = await extra.api.post<User>("/login", authData);

    if (!response.data) throw new Error();

    dispatch(userActions.aetAuthData(response.data));

    localStorage.setItem(USER_LOCAL_STORAGE_KEY, JSON.stringify(response.data));
    extra.navigate("/about");

    return response.data;
  } catch (e) {
    console.log(e);
    return rejectWithValue("error");
  }
});
