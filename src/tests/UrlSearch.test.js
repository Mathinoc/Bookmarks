import React from "react";
import "@testing-library/jest-dom";
import {
  render,
  waitFor,
  cleanup,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import UrlSearch from "../components/UrlSearch";

afterEach(cleanup);

describe("URL search", () => {
  it("Should display a Save button and an input", async () =>{
    render(<UrlSearch />);
    const saveButton = screen.getByRole("button", {name: "Save"});
    expect(saveButton).toBeInTheDocument();
    const inputField = screen.getByRole("textbox");
    const placeHolder = inputField.getAttribute('placeholder');
    expect(inputField).toBeInTheDocument();
    expect(placeHolder).toEqual("Paste url...");
  })
  it("Should add a delete button when input not empty", async () => {
    render(<UrlSearch />);
    const inputField = screen.getByRole("textbox");
    await userEvent.type(inputField, "http://");
    expect(screen.getByDisplayValue("http://")).toEqual(inputField);
    expect(screen.getByDisplayValue("http://")).toBeTruthy();

    const crossButton = screen.getByRole("button", {name:/clear-input/i});
    expect(crossButton).toBeTruthy();
    await userEvent.click(crossButton);
    //expect(screen.getByRole("textbox").value).toEqual("");

  });
  it("Should call submit function on save", async () => {
    render(<UrlSearch />);
    const inputField = screen.getByRole("textbox");
    await userEvent.type(inputField, "https://vimeo.com/565486457");
    const saveButton = screen.getByRole("button", {name: "Save"});
    //await userEvent.click(saveButton);

  })
  
});
