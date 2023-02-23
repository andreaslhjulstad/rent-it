/* eslint-disable testing-library/prefer-screen-queries */
/* eslint-disable testing-library/render-result-naming-convention */
import { fireEvent, getByText, render, screen, waitFor, within } from "@testing-library/react";
import { useEffect } from "react";
import { MemoryRouter } from "react-router-dom";
import AddBox from "../../Data/Components/AddBox";
import AdsPage from "./AdsPage";
import firestorePkg, { DocumentData, DocumentReference, FirestoreDataConverter} from 'firebase/firestore';

    describe("RegisterPage", () => {
    const setup = async () => {
        render(
            <MemoryRouter>
            <AdsPage />
            </MemoryRouter>
        );
    };
    test("page shows navbar", () => {
        setup();

        const navBar = screen.getByRole("navigation");
        expect(navBar).toBeInTheDocument();
    });

    test("page shows AdBox grid", () => {
        setup();

        const grid = screen.getByTestId("homePageGrid");
        expect(grid).toBeInTheDocument();

    });
})