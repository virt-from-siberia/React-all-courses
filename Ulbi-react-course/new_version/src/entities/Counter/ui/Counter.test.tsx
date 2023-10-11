import { render, screen, fireEvent } from "@testing-library/react";

import { Counter } from "./Counter";
import { componentRender } from "shared/lib/componentRender/componentRender";

describe("Counter", () => {
  test("test render", () => {
    componentRender(<Counter />, {
      initialState: { counter: { value: 10 } },
    });
    expect(screen.queryByTestId("value-title")).toHaveTextContent("10");
  });
  test("test action button decrement", () => {
    componentRender(<Counter />, {
      initialState: { counter: { value: 10 } },
    });
    fireEvent.click(screen.getByTestId("decrement-btn"));
    expect(screen.queryByTestId("value-title")).toHaveTextContent("9");
  });
  test("test action button increment", () => {
    componentRender(<Counter />, {
      initialState: { counter: { value: 10 } },
    });
    fireEvent.click(screen.getByTestId("increment-btn"));
    expect(screen.queryByTestId("value-title")).toHaveTextContent("11");
  });
});
