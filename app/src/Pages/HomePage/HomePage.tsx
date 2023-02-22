import { getDownloadURL, getStorage, ref } from "firebase/storage";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../Data/Components/navbar/Navbar";
import styles from "./HomePage.module.css";

export const HomePage = () => {

  const [toolsImage, setToolsImage] = useState("")
  const [rentImage, setRentImage] = useState("")
  const [rentItImage, setRentItImage] = useState("")

  useEffect(() => {

      const getImages = async () => {
        const storage = getStorage();
        const image1 = await getDownloadURL(ref(storage, "images/page/tools.jpg"));
        const image2 = await getDownloadURL(ref(storage, "images/page/rent.jpg"));
        const image3 = await getDownloadURL(ref(storage, "images/page/handyman.jpg"));
        setToolsImage(image1);
        setRentImage(image2);
        setRentItImage(image3);
      }  
      getImages()
  })

  return (
    <div id={styles.HomePage}>
        <Navbar />
        <div id={styles.infoDivs}>
          <div id={styles.pageInfoDiv}>
            <h1>Hva er RentIt</h1>
            <div>
              <p>RentIt en plattform hvor man kan opprette annonser for utlån eller
                søke på produkter en selv trenger. RentIt skiller seg ut
                fra andre byttesider ved å tilby en lavterskel tjeneste som
                fokuserer på utlån og gjenbruk av produkter med lang levetid. Målet med plattformen er å
                forenkle deling av verktøy og redskaper slik at man slipper å kjøpe inn nytt utstyr til sjeldne
                anledninger, men gjøre det mulig å gjenbruke og dele det en har fremfor å gjøre innkjøp av nye produkter.</p>              
              <img src={toolsImage} alt="" />
            </div>
          </div>
          <div id={styles.adInfoDiv}>
            <h1>Hvorfor bruke RentIt</h1>
            <div>
              <img src={rentImage} alt="" />
              <p>Mange, særlig unge unge, uetablerte voksne har en begrenset samling av verktøy og redskaper til bruk i
                  uventede hendelser eller for å utforske nye hobbyer. Dette kan være fordi de ikke har råd eller
                  lyst til å investere i produkter til engangsbruk. I tillegg mange mer
                  bevisst på forbruket sitt og opptatt av miljøbesparelser og skaper en høyere terskel for å
                  prøve ut nye hobbyer og utføre reparasjoner som burde vært gjort for lenge siden. </p>              
            </div>
          </div>
          <div id={styles.loanInfoDiv}>
            <h1>Hvordan bruke RentIt</h1>
            <div>
              <p>Å bruke RentIt er enkelt! Etter du har laget en profil kan du opprette egne annonser raskt og enkelt ved
                å klikke på "opprett annonse" øverst i menyen og fylle ut annonse informasjonen. Om du ønsker å leie verktøy kan du gå til annonse siden 
                der du kan søke og filtrere etter de redskapene og verktøyene du trenger. Når du har funnet det du lette etter kan du raskt oprette 
                en låne-avtale og så er det bare å sett i gang med byggeprosjektet!</p>              
              <img src={rentItImage} alt="" />
            </div>
          </div>
        </div>
    </div>
  )
};

export default HomePage;
