import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkExtraArg } from "app/providers/StoreProvider";

import { Profile } from "../types/profile";

export const fetchProfileData = createAsyncThunk<
  Profile,
  void,
  { rejectValue: string; extra: ThunkExtraArg }
>("profile/fetchProfileData", async (_, thunkApi) => {
  const { extra, rejectWithValue } = thunkApi;

  try {
    const response = await extra.api.get<Profile>("/profile");
    return response.data;
  } catch (e) {
    console.log(e);
    return rejectWithValue("error");
  }
});
