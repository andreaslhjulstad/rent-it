import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./CreateAdPage.module.css";
import buttonStyles from "../../GlobalStyling/Buttons.module.css";
import { getAuth } from "firebase/auth";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { LocalData } from "../../Data/LocalData";
import { updateDoc } from "firebase/firestore";

export const CreateAdPage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [images, setImages] = useState<File[]>([]);
  const [area, setArea] = useState("");

  const createAd = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validering

    if (title === "" || description === "" || price === 0 || area === "") {
      alert("Alle de obligatoriske feltene må fylles ut");
      return;
    }
    if (price < 0) {
      alert("Prisen kan ikke være negativ");
      return;
    }
    if (isNaN(price)) {
      alert("Prisen må være et tall");
      return;
    }

    // Opprett annonse

    // Opprett annonse-objekt
    const ad = {
      title: title,
      description: description,
      price: price,
      area: area,
      userId: getAuth().currentUser!.uid,
    };

    // Opprett annonse-dokument i firebase med automatisk generert id
    LocalData.ads
      .createNewDocumentWithoutId(ad)
      .then(docRef => {
        const adRef = docRef;
        const adId = adRef.id;
        const storage = getStorage();
        const imagePaths: string[] = [];

        // Last opp bilder til storage
        for (let i = 0; i < images.length; i++) {
          const path = `images/ads/${adId}/${images[i].name}`;
          const storageRef = ref(storage, path);
          uploadBytes(storageRef, images[i])
          .catch((error) => {
            alert(error.message);
          });

          // OBS! Skulle gjerne hatt denne i en .then() for uploadBytes, slik at bildet bare
          // legges til dersom opplastingen er en suksess, men har prøvd flere forskjellige måter,
          // og har ikke klart å få det til å fungere. Derfor legges bildet til i arrayet uansett.
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
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <div id={styles.createAdPage}>
      <div className={styles.createAdContent}>
        <h1>Opprett en annonse</h1>
        <form className={styles.createAdForm} onSubmit={createAd}>
          <label htmlFor="title">
            Tittel på annonse:
            <span className={styles.required}>&nbsp;*</span>
          </label>
          <input
            type="text"
            id="title"
            placeholder="Fyll inn tittel "
            onChange={(e) => setTitle(e.target.value)}
          />
          <label htmlFor="description">
            Beskrivelse av annonse:
            <span className={styles.required}>&nbsp;*</span>
          </label>
          <textarea
            id="description"
            placeholder="Fyll inn beskrivelse"
            onChange={(e) => setDescription(e.target.value)}
          />
          <label htmlFor="price">
            Pris på annonse:
            <span className={styles.required}>&nbsp;*</span>
          </label>
          <input
            type="text"
            id="price"
            placeholder="Fyll inn pris"
            onChange={(e) => setPrice(parseInt(e.target.value))}
          />
          <label htmlFor="image">
            Legg ved bilde(r) til annonsen (valgfritt):
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
          <label htmlFor="area">
            Hvilket område befinner du deg i?
            <span className={styles.required}>&nbsp;*</span>
          </label>
          <input
            type="text"
            id="area"
            placeholder="Fyll inn område"
            onChange={(e) => setArea(e.target.value)}
          />
          <button className={buttonStyles.mainButton} type="submit">
            Opprett annonse
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateAdPage;
