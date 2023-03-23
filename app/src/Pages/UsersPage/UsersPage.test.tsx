import { fireEvent, getByText, render, screen, waitFor, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import UsersPage from "./UsersPage";


    describe("UsersPage test", () => {
        const setup = async () => {
            render(
                <MemoryRouter>
                <UsersPage />
                </MemoryRouter>

            );
        };
        test("page shows UserBox list", () => {
            setup();
    
            const list = screen.getByTestId("userBoxList");
            expect(list).toBeInTheDocument();
    
        });

    })
