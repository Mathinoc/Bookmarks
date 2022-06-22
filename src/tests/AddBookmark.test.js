import { useRef } from "react";
import "@testing-library/jest-dom";
import { render, act, cleanup, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import UrlSearch from "../components/AddBookmark";

afterEach(cleanup);

jest.mock("react", () => {
  const originReact = jest.requireActual("react");
  const customUseRef = jest.fn();
  return {
    ...originReact,
    useRef: customUseRef,
  };
});

describe("URL search", () => {
  it("Should display an 'Ajouter' button and an input", async () => {
    render(<UrlSearch />);
    const saveButton = screen.getByRole("button", { name: "Ajouter" });
    expect(saveButton).toBeInTheDocument();
    const inputField = screen.getByRole("textbox");
    const placeHolder = inputField.getAttribute("placeholder");
    expect(inputField).toBeInTheDocument();
    expect(placeHolder).toEqual("Coller un url ici...");
  });

  it("Should add a delete button when input not empty", async () => {
    const urlInput = { current: { value: "" } };
    useRef.mockReturnValueOnce(urlInput);
    render(<UrlSearch urlInput={urlInput} />);

    expect(screen.queryByRole("button", { name: /clear-input/i })).toBeNull();
    const inputField = screen.getByRole("textbox");
    await userEvent.type(inputField, "http://");
    expect(screen.getByDisplayValue("http://")).toEqual(inputField);

    const crossButton = screen.getByRole("button", { name: /clear-input/i });
    expect(crossButton).toBeTruthy();
    await userEvent.click(crossButton);
    expect(screen.getByRole("textbox").value).toEqual("");
    expect(screen.queryByRole("button", { name: /clear-input/i })).toBeNull();
  });

  it("Should display appropriate message on save", async () => {
    const createBookmark = async function () {
      return "Aucune ressource trouvée, vérifiez l'url.";
    };
    const urlInput = { current: { value: "" } };
    useRef.mockReturnValueOnce(urlInput);
    render(<UrlSearch urlInput={urlInput} createBookmark={createBookmark} />);

    const saveButton = screen.getByRole("button", { name: "Ajouter" });
    await userEvent.click(saveButton);
    expect(screen.getByText("Pas d'url détecté")).toBeTruthy();
    const inputField = screen.getByRole("textbox");
    await userEvent.type(inputField, "https://vimeo.com/565486457");
    await userEvent.click(saveButton);
    expect(screen.getByText("Aucune ressource trouvée, vérifiez l'url.")).toBeTruthy();
    await act(async () => await new Promise((r) => setTimeout(r, 2000)));
    // eslint-disable-next-line testing-library/no-node-access
    expect(document.getElementsByClassName("AddBookmark__error-displayed")[0]).toBeInTheDocument();
    await act(async () => await new Promise((r) => setTimeout(r, 1500)));
    // eslint-disable-next-line testing-library/no-node-access
    expect(document.getElementsByClassName("false")[0]).toBeInTheDocument();
  });
});
