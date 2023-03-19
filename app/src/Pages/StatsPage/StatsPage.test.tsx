import { render, waitFor, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import StatsPage from "./StatsPage";


describe("StatsPage", () => {
  const setup = async () => {
    render(
      <MemoryRouter>
        <StatsPage />
      </MemoryRouter>
    );
    await waitFor(() => {
      const { getByText } = within(screen.getByTestId("statsPageContent"));
      expect(getByText("Statistikk for mine annonser")).toBeInTheDocument();
  });
  };

  test("page shows navbar", () => {
    setup();

    const navBar = screen.getByRole("navigation");
    expect(navBar).toBeInTheDocument();
  });


  test("page shows statistics for user ads", () => {
    setup();

    const statisticsList = screen.getByTestId("adsStatisticsList");
    expect(statisticsList).toBeInTheDocument();
  });

});