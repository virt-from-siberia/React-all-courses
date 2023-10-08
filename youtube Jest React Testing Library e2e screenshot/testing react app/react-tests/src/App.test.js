import { render, screen } from "@testing-library/react";
import App from "./App";

describe("test App", () => {
  test("renders learn react link", async () => {
    render(<App />);

    screen.debug();

    const helloWorldElement = await screen.findByText(/data/i);
    expect(helloWorldElement).toBeInTheDocument();
    expect(helloWorldElement).toHaveStyle({ color: "red" });

    screen.debug();
    // const helloWorldElement = screen.queryByText(/Hello2/i);
    // expect(helloWorldElement).toBeNull();

    // const helloWorldElement = screen.getByText(/Hello world/i);
    // const btn = screen.getByRole("button");
    // const input = screen.getByPlaceholderText(/input value/i);

    // expect(helloWorldElement).toBeInTheDocument();
    // expect(btn).toBeInTheDocument();
    // expect(input).toBeInTheDocument();
    // expect(input).toMatchSnapshot();

    // screen.debug();
  });
});
