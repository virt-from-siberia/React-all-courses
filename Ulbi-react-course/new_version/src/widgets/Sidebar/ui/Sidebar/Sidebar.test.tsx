import { render, screen, fireEvent } from "@testing-library/react";
import { Sidebar } from "widgets/Sidebar/ui/Sidebar";

describe("Sidebar", () => {
  test("test render", () => {
    render(<Sidebar />);
    expect(screen.queryByTestId("sidebar")).toBeInTheDocument();
  });
  test("toggle sidebar", () => {
    render(<Sidebar />);
    const toggleBtn = screen.getByTestId("sidebar-toggle");
    expect(screen.queryByTestId("sidebar")).toBeInTheDocument();

    fireEvent.click(toggleBtn);
    expect(screen.queryByTestId("sidebar")).toHaveClass("collapsed");
  });
});
