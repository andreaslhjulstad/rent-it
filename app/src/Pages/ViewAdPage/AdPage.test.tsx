import { render, screen, waitFor, within } from "@testing-library/react";
import AdPage from "./AdPage";
import { MemoryRouter } from "react-router-dom";

describe("AdPage", () => {
    const setup = async () => {
      render(
        <MemoryRouter>
          <AdPage />
        </MemoryRouter>
      );
      await waitFor(() => {
        const { getByText } = within(screen.getByTestId("adPage"));
        expect(getByText("Område:")).toBeInTheDocument();
      });
    };
    test("elements are rendered", () => {
        setup(); //Laster inn siden
        //Henter elementene fra siden som ikke er firebase-data
        //Fire-base datainnlasting valideres i AdData.ts
        const area = screen.getByText("Område:");
        const price = screen.getByText("Pris:");
        const button = screen.getByText("Rent it"); 
        const contactInfo = screen.getByText("Utleier:")
        //Tester at elementene er på siden
        expect(area).toBeInTheDocument();
        expect(price).toBeInTheDocument();
        expect(button).toBeInTheDocument(); 
        expect(contactInfo).toBeInTheDocument();
    })
    
    test("being able to submit the form to rent it", () => {
        setup();
        const submitButton = screen.getByRole("button", {
          name: /Rent it/i,
        });
        expect(submitButton).toBeInTheDocument();
      });
});
