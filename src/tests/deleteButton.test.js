import "@testing-library/jest-dom";
import {
  render,
  cleanup,
  screen,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DeleteButton from "../components/DeleteButton";

afterEach(cleanup);

describe.only("Delete Button", () => {
  it("Should render with image and alt", () => {
    const onClick = jest.fn();
    render(<DeleteButton onClick={onClick}/> );
    expect(screen.getByRole("button")).toBeTruthy();
    expect(screen.getByRole("button").value).toEqual("");
    const icon = screen.getByRole("img", {name: "delete"})
    expect(icon).toBeTruthy();
  })
  it("Should call onClick function on click", async () => {
    const onClick = jest.fn();
    render(<DeleteButton onClick={onClick}/> );
    await userEvent.click(screen.getByRole("button"))
    expect(onClick).toHaveBeenCalled();
  })
})