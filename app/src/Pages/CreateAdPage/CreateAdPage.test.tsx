import { fireEvent, render, screen } from "@testing-library/react";
import CreateAdPage from "./CreateAdPage";

test("elements are rendered", () => {
  render(<CreateAdPage />);
  const titleInput = screen.getByRole("textbox", {
    name: /Tittel på annonse:/i,
  });
  const descriptionInput = screen.getByRole("textbox", {
    name: /Beskrivelse av annonse:/i,
  });
  const areaInput = screen.getByRole("textbox", {
    name: /Hvilket område befinner du deg i?/i,
  });
  const priceInput = screen.getByRole("textbox", { name: /Pris på annonse:/i });
  const submitButton = screen.getByRole("button", { name: /Opprett annonse/i });

  // Check that all elements are rendered
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
    name: /Beskrivelse av annonse:/i,
  });
  const titleInput = screen.getByRole("textbox", {
    name: /Tittel på annonse:/i,
  });
  const priceInput = screen.getByRole("textbox", { name: /Pris på annonse:/i });
  const areaInput = screen.getByRole("textbox", {
    name: /Hvilket område befinner du deg i?/i,
  });

  // Test with all empty values
  expect(submitButton).toBeDisabled();

  // Test with only title filled in
  fireEvent.change(titleInput, { target: { value: "Test" } });
  expect(submitButton).toBeDisabled();

  // Test with title and description filled in
  fireEvent.change(descriptionInput, { target: { value: "Test" } });
  expect(submitButton).toBeDisabled();

  // Test with title, description and price filled in
  fireEvent.change(priceInput, { target: { value: "1" } });
  expect(submitButton).toBeDisabled();

  // Test with all fields filled in
  fireEvent.change(areaInput, { target: { value: "Test" } });
  expect(submitButton).toBeEnabled();
});

test("price input values", async () => {
  render(<CreateAdPage />);
  const titleInput = screen.getByRole("textbox", {
    name: /Tittel på annonse:/i,
  });
  const descriptionInput = screen.getByRole("textbox", {
    name: /Beskrivelse av annonse:/i,
  });
  const areaInput = screen.getByRole("textbox", {
    name: /Hvilket område befinner du deg i?/i,
  });
  const priceInput = screen.getByRole("textbox", { name: /Pris på annonse:/i });
  const submitButton = screen.getByRole("button", { name: /Opprett annonse/i });

  // Fill in dummy values for other inputs to enable submit button
  fireEvent.change(titleInput, { target: { value: "Test" } });
  fireEvent.change(descriptionInput, { target: { value: "Test" } });
  fireEvent.change(areaInput, { target: { value: "Test" } });

  // Test with valid input
  fireEvent.change(priceInput, { target: { value: "1" } });
  expect(submitButton).toBeEnabled();

  // Test with invalid input (non-numeric)
  fireEvent.change(priceInput, { target: { value: "Test" } });
  expect(submitButton).toBeDisabled();

  // Test with invalid input (negative number)
  fireEvent.change(priceInput, { target: { value: "-1" } });
  expect(submitButton).toBeDisabled();
  const priceGreaterThanZeroError = screen.getByText(/Pris må være større enn 0!/i);
  expect(priceGreaterThanZeroError).toBeInTheDocument();

  // Test with invalid input (zero)
  fireEvent.change(priceInput, { target: { value: "0" } });
  expect(submitButton).toBeDisabled();
  expect(priceGreaterThanZeroError).toBeInTheDocument();

  // Test with invalid input (empty)
  fireEvent.change(priceInput, { target: { value: "" } });
  const priceNotANumberError = screen.getByText(/Pris må være et tall!/i);
  expect(submitButton).toBeDisabled();
  expect(priceNotANumberError).toBeInTheDocument();
});


