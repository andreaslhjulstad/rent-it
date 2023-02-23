import { fireEvent, render, screen } from "@testing-library/react";
import CreateAdPage from "./CreateAdPage";

test("elements are rendered", () => {
  render(<CreateAdPage />); // Laster inn siden

  // Henter elementene fra siden
  const titleInput = screen.getByRole("textbox", {
    name: /Tittel på annonse/i,
  });
  const descriptionInput = screen.getByRole("textbox", {
    name: /Beskrivelse av annonse/i,
  });
  const areaInput = screen.getByRole("textbox", {
    name: /Hvilket område befinner du deg i?/i,
  });
  const priceInput = screen.getByRole("textbox", { name: /Pris på annonse/i });
  const submitButton = screen.getByRole("button", { name: /Opprett annonse/i });

  // Sjekker at elementene er på siden
  expect(titleInput).toBeInTheDocument();
  expect(submitButton).toBeInTheDocument();
  expect(descriptionInput).toBeInTheDocument();
  expect(priceInput).toBeInTheDocument();
  expect(areaInput).toBeInTheDocument();
});

test("empty input values", async () => {
  render(<CreateAdPage />);

  const submitButton = screen.getByRole("button", { name: /Opprett annonse/i });
  const descriptionInput = screen.getByRole("textbox", {
    name: /Beskrivelse av annonse/i,
  });
  const titleInput = screen.getByRole("textbox", {
    name: /Tittel på annonse/i,
  });
  const priceInput = screen.getByRole("textbox", { name: /Pris på annonse/i });
  const areaInput = screen.getByRole("textbox", {
    name: /Hvilket område befinner du deg i?/i,
  });

  // Test med tomme verdier
  expect(submitButton).toBeDisabled();

  // Test med tittel fylt inn
  fireEvent.change(titleInput, { target: { value: "Test" } });
  expect(submitButton).toBeDisabled();

  // Test med tittel og beskrivelse fylt inn
  fireEvent.change(descriptionInput, { target: { value: "Test" } });
  expect(submitButton).toBeDisabled();

  // Test med tittel, beskrivelse og pris fylt inn
  fireEvent.change(priceInput, { target: { value: "1" } });
  expect(submitButton).toBeDisabled();

  // Test med alle obligatoriske felter (tittel, beskrivelse, pris og område) fylt inn
  fireEvent.change(areaInput, { target: { value: "Test" } });
  expect(submitButton).toBeEnabled();
});

test("price input values", async () => {
  render(<CreateAdPage />);

  const titleInput = screen.getByRole("textbox", {
    name: /Tittel på annonse/i,
  });
  const descriptionInput = screen.getByRole("textbox", {
    name: /Beskrivelse av annonse/i,
  });
  const areaInput = screen.getByRole("textbox", {
    name: /Hvilket område befinner du deg i?/i,
  });
  const priceInput = screen.getByRole("textbox", { name: /Pris på annonse/i });
  const submitButton = screen.getByRole("button", { name: /Opprett annonse/i });

  // Fyll in "dummy"-verdier i de andre feltene
  fireEvent.change(titleInput, { target: { value: "Test" } });
  fireEvent.change(descriptionInput, { target: { value: "Test" } });
  fireEvent.change(areaInput, { target: { value: "Test" } });

  // Test med gyldig input
  fireEvent.change(priceInput, { target: { value: "1" } });
  expect(submitButton).toBeEnabled();

  // Test med ugyldig input (ikke-numerisk)
  fireEvent.change(priceInput, { target: { value: "Test" } });
  expect(submitButton).toBeDisabled();
  const priceNotANumberError = screen.getByText(/Pris må være et tall!/i);
  expect(priceNotANumberError).toBeInTheDocument();

  // Test med ugyldig input (negativt tall)
  fireEvent.change(priceInput, { target: { value: "-1" } });
  expect(submitButton).toBeDisabled();
  const priceGreaterThanZeroError = screen.getByText(
    /Pris må være større enn 0!/i
  );
  expect(priceGreaterThanZeroError).toBeInTheDocument();

  // Test med ugyldig input (0) 
  fireEvent.change(priceInput, { target: { value: "0" } });
  expect(submitButton).toBeDisabled();
  expect(priceGreaterThanZeroError).toBeInTheDocument();

  // Test med ugyldig input (tom verdi)
  fireEvent.change(priceInput, { target: { value: "" } });
  expect(submitButton).toBeDisabled();
  expect(priceNotANumberError).toBeInTheDocument();
});
