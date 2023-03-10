import { render, waitFor, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import UserPage from "./UserPage";


describe("UserPage", () => {
  const setup = async () => {
    render(
      <MemoryRouter>
        <UserPage />
      </MemoryRouter>
    );
    await waitFor(() => {
      const { getByText } = within(screen.getByTestId("userPageContent"));
      expect(getByText("Brukerprofil")).toBeInTheDocument();
  });
  };

  test("page shows navbar", () => {
    setup();

    const navBar = screen.getByRole("navigation");
    expect(navBar).toBeInTheDocument();
  });

  // Sett inn andre tester her

  test("page shows user ads", () => {
    setup();

    const adsList = screen.getByTestId("userAdsList");
    expect(adsList).toBeInTheDocument();
  });

  test("page shows user info", () => {
    setup();

    const userPicture = screen.getByTestId("userPicture");
    expect(userPicture).toBeInTheDocument();

    const userName = screen.getByTestId("userName");
    expect(userName).toBeInTheDocument();

    const userEmail = screen.getByTestId("userEmail");
    expect(userEmail).toBeInTheDocument();

    const userPhoneNum = screen.getByTestId("userPhoneNum");
    expect(userPhoneNum).toBeInTheDocument();
  });

});