import { ICounterSchema } from "../types/counterSchema";
import { counterReducer, counterActions } from "./counterSlice";

describe("getCounterValues", () => {
  test("decrement", () => {
    const state: ICounterSchema = {
      value: 10,
    };
    expect(counterReducer(state, counterActions.decrement())).toEqual({
      value: 9,
    });
  });
  test("increment", () => {
    const state: ICounterSchema = {
      value: 10,
    };
    expect(counterReducer(state, counterActions.increment())).toEqual({
      value: 11,
    });
  });
  test("should work with empty state", () => {
    expect(counterReducer(undefined, counterActions.increment())).toEqual({
      value: 1,
    });
  });
});
