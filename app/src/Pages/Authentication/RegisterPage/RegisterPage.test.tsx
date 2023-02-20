import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import RegisterPage from "./RegisterPage";
import { MemoryRouter } from "react-router-dom";

describe("RegisterPage", () => {
  const setup = async () => {
    render(
      <MemoryRouter>
        <RegisterPage />
      </MemoryRouter>
    );
    await waitFor(() => {
      const { getByText } = within(screen.getByTestId("registerContent"));
      expect(getByText("Opprett ny bruker")).toBeInTheDocument();
    });
  };
  test("being able to type in the input fields", () => {
    setup();
    const nameInput = screen.getByLabelText("Ditt navn");
    const emailInput = screen.getByLabelText("Din e-postadresse");
    const passwordInput = screen.getByLabelText("Ditt passord");
    expect(nameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    fireEvent.change(nameInput, { target: { value: "Ola Nordmann" } });
    fireEvent.change(emailInput, { target: { value: "ola@mail.com" } });
    fireEvent.change(passwordInput, { target: { value: "ola123" } });
    expect(nameInput).toHaveValue("Ola Nordmann");
    expect(emailInput).toHaveValue("ola@mail.com");
    expect(passwordInput).toHaveValue("ola123");
  });
  test("all input from user should be interpreted as string", () => {
    // Choosing to let the user have numbers and other characters in the input fields, as long as they are saved as strings in database.
    setup();
    const nameInput = screen.getByLabelText("Ditt navn");
    fireEvent.change(nameInput, { target: { value: 123 } });
    expect(nameInput).toHaveValue("123");
    fireEvent.change(nameInput, { target: { value: -199.55 } });
    expect(nameInput).toHaveValue("-199.55");
    fireEvent.change(nameInput, { target: { value: -199.55 } });
    expect(nameInput).toHaveValue("-199.55");
  });
  test("being able to submit the form to register", () => {
    setup();
    const submitButton = screen.getByRole("button");
    expect(submitButton).toBeInTheDocument();
  });
});