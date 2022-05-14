import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import AppBar from "./AppBar";

describe("AppBar", () => {
  it("should render correctly", () => {
    const { container } = render(
      <MemoryRouter>
        <AppBar />
      </MemoryRouter>
    );
    expect(container).toMatchSnapshot();
  });
  it("should contain the logo image", () => {
    const { container } = render(
      <MemoryRouter>
        <AppBar />
      </MemoryRouter>
    );
    expect(container.querySelector("img")).toBeInTheDocument();
  });
});
