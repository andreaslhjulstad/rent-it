import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import LoanAgreement from "./LoanAgreement";
import { MemoryRouter } from "react-router-dom";

describe("LoanAgreementPage", () => {
    const setup = async () => {
      render(
        <MemoryRouter>
          <LoanAgreement />
        </MemoryRouter>
      );
      await waitFor(() => {
        const { getByText } = within(screen.getByTestId("registerContent"));
        expect(getByText("Inngå en Låneavtale")).toBeInTheDocument();
      });
    };

    test("LoanAgreement", () => {
        setup();
        
        // Sjekker at siden laster inn
        expect(screen.getByText("Lån av:")).toBeInTheDocument();
        expect(screen.getByText("Dato til:")).toBeInTheDocument();
        expect(screen.getByText("Dato fra:")).toBeInTheDocument();
        expect(screen.getByText("Bekreft")).toBeInTheDocument();
    
    });
    
    test("dates in the past", async () => {
        setup();

        const dateFromInput = screen.getByRole("textbox", { name: "Dato fra:" });
        const dateToInput = screen.getByRole("textbox", { name: "Dato til:" });
      
        const submitButton = screen.getByText("Bekreft");
      
        fireEvent.change(dateFromInput, { target: { value: "01/01/2021" } });
        expect(submitButton).toBeDisabled();
    
        fireEvent.change(dateToInput, { target: { value: "01/06/2021" } });
        expect(submitButton).toBeDisabled();
    });
    
    
    test("being able to make a loan agreeming", async () => {
        setup();
    
        const dateFromInput = screen.getByRole("textbox", { name: "Dato fra:" });
        const dateToInput = screen.getByRole("textbox", { name: "Dato til:" });

        const submitButton = screen.getByText("Bekreft");
    
        fireEvent.change(dateFromInput, { target: { value: "25/02/2023" } });
        expect(submitButton).toBeDisabled();
    
        fireEvent.change(dateToInput, { target: { value: "27/02/2023" } }); 
    });
});