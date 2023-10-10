import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Sidebar } from "widgets/Sidebar/ui/Sidebar";

describe("Sidebar", () => {
  test("test render", () => {
    render(
      <MemoryRouter>
        <Sidebar />
      </MemoryRouter>
    );
    expect(screen.queryByTestId("sidebar")).toBeInTheDocument();
  });
  test("toggle sidebar", () => {
    render(
      <MemoryRouter>
        <Sidebar />
      </MemoryRouter>
    );
    const toggleBtn = screen.getByTestId("sidebar-toggle");
    expect(screen.queryByTestId("sidebar")).toBeInTheDocument();

    fireEvent.click(toggleBtn);
    expect(screen.queryByTestId("sidebar")).toHaveClass("collapsed");
  });
});
