import { fireEvent, render, screen } from "@testing-library/react";
import AdPage from "./AdPage";

test("elements are rendered", () => {
    render(<AdPage />); //Laster inn siden

    //Henter elementene fra siden som ikke er firebase-data
    const area = screen.getByRole("textbox", {name: / Område: /i, });
    const price = screen.getByRole("textbox", {name: / Pris: /i,  });
    const button = screen.getByRole("button", {name: / Rent it /i, }); 
    const contactInfo = screen.getByRole("textbox",{name: /Kontaktinformasjon:/i, });
    const goTo = screen.getByRole("textbox",{name: /Gå til bruker:/i,  });
    const userLink = screen.getByRole("link", {name: /Ola Nordmann/i,  });
    const tlf = screen.getByRole("textbox", {name: /tlf:/i, });
    const email = screen.getByRole("textbox",{name: /e-mail:/i, });

    //Tester at elementene er på siden
    expect(area).toBeInTheDocument();
    expect(price).toBeInTheDocument();
    expect(button).toBeInTheDocument(); 
    expect(contactInfo).toBeInTheDocument();
    expect(goTo).toBeInTheDocument();
    expect(userLink).toBeInTheDocument();
    expect(tlf).toBeInTheDocument();
    expect(email).toBeInTheDocument();
    
    
    
    
    

})
