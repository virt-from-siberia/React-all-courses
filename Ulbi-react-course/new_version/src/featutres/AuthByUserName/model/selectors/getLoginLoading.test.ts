import { DeepPartial } from "@reduxjs/toolkit";
import { StateSchema } from "app/providers/StoreProvider";
import { getLoginLoading } from "./getLoginLoading";

describe("getLoginUsername.test", () => {
  test("should return isLoading", () => {
    const state: DeepPartial<StateSchema> = {
      loginForm: {
        isLoading: true,
      },
    };
    expect(getLoginLoading(state as StateSchema)).toEqual(true);
  });
  test("should work with empty state", () => {
    const state: DeepPartial<StateSchema> = {};
    expect(getLoginLoading(state as StateSchema)).toEqual(false);
  });
});
