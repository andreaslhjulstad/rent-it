import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import SignInPage from "./SignInPage";
import { MemoryRouter } from "react-router-dom";

describe("SignInPage", () => {
  const setup = async () => {
    render(
      <MemoryRouter>
        <SignInPage />
      </MemoryRouter>
    );
    await waitFor(() => {
      const { getByText } = within(screen.getByTestId("signInContent"));
      expect(getByText("Logg inn")).toBeInTheDocument();
    });
  };
  test("being able to type in the input fields", () => {
    setup();
    const emailInput = screen.getByLabelText("Din e-postadresse");
    const passwordInput = screen.getByLabelText("Ditt passord");
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    fireEvent.change(emailInput, { target: { value: "ola@mail.com" } });
    fireEvent.change(passwordInput, { target: { value: "ola123" } });
    expect(emailInput).toHaveValue("ola@mail.com");
    expect(passwordInput).toHaveValue("ola123");
  });

  test("being able to submit the form to register", () => {
    setup();
    const submitButton = screen.getAllByRole("button")[0];
    expect(submitButton).toBeInTheDocument();
  });
});
