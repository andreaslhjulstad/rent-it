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

    test("render AddBox", () => {
        //Her må man lage et "fake" firestore doc men mocReturn value er bare ikke enkel å sammarbeide med
        
        /* let docSpy = jest.spyOn(firestorePkg, 'doc').mockReturnValue(
            {   // Jeg vet ikke hva som skal være på parent og withConverter
                converter: null,
                type: "document",
                id: "",
                path: "",
                parent: undefined,
                withConverter: function <U>(converter: FirestoreDataConverter<U>): DocumentReference<U> {
                    throw new Error("Function not implemented.");
                }
            }    
        );

        let useDocSpy = jest.spyOn(firestorePkg, 'useFirestoreDocument').mockReturnValue( //Jeg aner ikke hvorfor det er feil
            { data: { title: "test", area: "her", description: "Test12", price: 12, images:"images/ads/23QEH97wCaVqEzxCEutY/bosch-universalimpact-18v-60-drill-screwdriver-battery-included.jpg", userId: "vNjSarNvWwbYWoaeCtR43NfHf7C2"} }
        )

        let app = render(<AdsPage />)
        let title = app.getByText(/test/i)
        expect(title).toBeInTheDocument()

        docSpy.mockRestore()
        useDocSpy.mockRestore() */

    });
})