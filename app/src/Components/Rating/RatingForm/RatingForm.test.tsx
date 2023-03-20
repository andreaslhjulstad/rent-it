import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import UserPage from "../../../Pages/ViewUserPage/UserPage";

describe("RatingForm", () => {
  const setup = async () => {
    render(
      <MemoryRouter>
        <UserPage />
      </MemoryRouter>
    );
    await waitFor(() => {
      const { getByText } = within(screen.getByTestId("ratingForm"));
      expect(getByText("Skriv en vurdering")).toBeInTheDocument();
    });
  };
  test("being able to type in the input fields", () => {
    setup();
    const descriptionInput = screen.getByLabelText("Din kommentar");
    expect(descriptionInput).toBeInTheDocument();
    fireEvent.change(descriptionInput, { target: { value: "Min vurdering" } });
    expect(descriptionInput).toHaveValue("Min vurdering");
  });
  test("being able to submit the form to register", () => {
    setup();
    const submitButton = screen.getByTestId("send-rating-button");
    expect(submitButton).toBeInTheDocument();
  });
});
