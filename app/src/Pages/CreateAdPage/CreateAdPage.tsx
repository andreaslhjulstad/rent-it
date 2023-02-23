import { useEffect, useRef, useState } from "react";
import styles from "./CreateAdPage.module.css";
import buttonStyles from "../../GlobalStyling/Buttons.module.css";
import globalStyles from "../../GlobalStyling/main.module.css";
import { getAuth } from "firebase/auth";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { LocalData } from "../../Data/LocalData";
import { updateDoc } from "firebase/firestore";
import Navbar from "../../Data/Components/navbar/Navbar";

const CreateAdPage = () => {
  const firstRender = useRef(true); // Brukes for å hindre at useEffect-metoden for feilmelding kjører på første render

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [images, setImages] = useState<File[]>([]);
  const [area, setArea] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [priceError, setPriceError] = useState("");

  /* 
  Metode som kjøres når tilstanden til et av de obligatoriske feltene
  (title, description, price eller area) endres, setter disabled-tilstanden
  til submit-knappen basert på om alle obligatoriske felt er fylt ut og har gyldige verdier 
  */
  useEffect(() => {
    setDisabled(
      title.trim() === "" ||
        description.trim() === "" ||
        isNaN(price) ||
        price <= 0 ||
        area.trim() === ""
    );
  }, [title, description, price, area]);

  /*
  Metode som kjøres når tilstanden til prisen endres,
  viser feilmelding i UI dersom prisen har en ugyldig verdi
  */
  useEffect(() => {
    if (firstRender.current) {
      // Ikke vis ev. feilmelding på første render (Obs! pga <React.StrictMode> i index.tsx vil ikke dette fungere i dev-modus)
      firstRender.current = false;
      return;
    }
    setPriceError(() => {
      if (isNaN(price)) {
        return "Pris må være et tall!";
      } else if (price <= 0) {
        return "Pris må være større enn 0!";
      } else {
        return "";
      }
    });
  }, [price]);

  const createAd = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Forhindrer at siden lastes på nytt når metoden kalles

    // Opprett annonse-objekt
    const ad = {
      title: title,
      description: description,
      price: price,
      area: area,
      userId: getAuth().currentUser ? getAuth().currentUser!.uid : "", // Lagrer bruker-id hvis brukeren er logget inn, ellers tom streng (for testing)
    };

    // Opprett annonse-dokument i firebase med automatisk generert id
    LocalData.ads
      .createNewDocumentWithoutId(ad)
      .then((docRef: any) => {
        const adRef = docRef;
        const adId = adRef.id;
        const storage = getStorage();
        const imagePaths: string[] = [];

        // Last opp bilder til storage
        for (let i = 0; i < images.length; i++) {
          const path = `images/ads/${adId}/${images[i].name}`;
          const storageRef = ref(storage, path);
          uploadBytes(storageRef, images[i]).catch((error) => {
            alert(error.message);
          });

          /*
          OBS! Skulle gjerne hatt denne i en .then() for uploadBytes, slik at bildet bare
          legges til dersom opplastingen er en suksess, men har prøvd flere forskjellige måter,
          og har ikke klart å få det til å fungere. Derfor legges bildet til i arrayet uansett
          */
          imagePaths.push(path);
        }

        // Oppdater annonse-dokumentet med pathene til bildene dersom brukeren har lagt ved bilder
        if (imagePaths.length > 0) {
          updateDoc(adRef, {
            images: imagePaths,
          });
        }
        alert("Annonse opprettet");
      })
      .catch((error: { message: any; }) => {
        alert(error.message);
      });
  };

  return (
    <div id={styles.createAdPage}>
      <Navbar />
      <div className={styles.createAdContent}>
        <h1>Opprett en annonse</h1>
        <form className={styles.createAdForm} onSubmit={createAd}>
          <label htmlFor="title">Tittel på annonse</label>
          <input
            type="text"
            id="title"
            placeholder="Fyll inn tittel "
            onChange={(e) => setTitle(e.target.value)}
          />
          <label htmlFor="description">Beskrivelse av annonse</label>
          <textarea
            id="description"
            placeholder="Fyll inn beskrivelse"
            onChange={(e) => setDescription(e.target.value)}
          />
          <label htmlFor="price">Pris på annonse</label>
          <input
            className={priceError ? styles.textFieldWithError : ""} // Viser rød ramme rundt input-feltet dersom prisen har en ugyldig verdi
            type="text"
            id="price"
            placeholder="Fyll inn pris"
            onChange={(e) => setPrice(parseInt(e.target.value))}
          />
          {priceError && <p className={styles.error}>{priceError}</p>}
          <label htmlFor="image">
            Legg ved bilde(r) til annonsen (valgfritt)
          </label>
          <input
            type="file"
            id="image"
            accept="image/png, image/jpeg"
            multiple
            onChange={(e) => {
              setImages(Array.from(e.target.files ?? []));
            }}
          />
          <label htmlFor="area">Hvilket område befinner du deg i?</label>
          <input
            type="text"
            id="area"
            placeholder="Fyll inn område"
            onChange={(e) => setArea(e.target.value)}
          />
          <button
            className={buttonStyles.mainButton}
            type="submit"
            disabled={disabled} // Deaktiverer knappen dersom noen av feltene er tomme/har ugyldige verdier
          >
            Opprett annonse
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateAdPage;

//Hva Synne har lagt til
//litt usikker på om dette skal gjøres i app eller her 

// import { ViewAdPage } from "../ViewAdPage/ViewAdPage";

// export default function CreateAdPage() {
//     document.body.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
//     return <ViewAdPage title = {setTitle} description = {setDescription} 
//     price = {setPrice} images = {setImages} area = {setArea} />;
// }

