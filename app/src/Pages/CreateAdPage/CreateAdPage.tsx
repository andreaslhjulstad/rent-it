import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./CreateAdPage.module.css";
import buttonStyles from "../../GlobalStyling/Buttons.module.css";
import { getAuth } from "firebase/auth";
import { getStorage, ref, uploadBytes} from "firebase/storage";
import { LocalData } from "../../Data/LocalData";

export const CreateAdPage = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [images, setImages] = useState<File[]>([]);
  const [area, setArea] = useState("");

  const createAd = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (title === "" || description === "" || price === 0) {
      alert("Alle feltene må fylles ut");
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

    const storage = getStorage();

    const imageReferences: string[] = [];
    // Last opp bilder til storage
    for (let i = 0; i < images.length; i++) {
      const path = "ads/" + images[i].name;
      const storageRef = ref(storage, path);
      uploadBytes(ref(storageRef), images[i])
        .then(() => {
          console.log("Uploaded image!");
        })
        .catch((error) => {
          console.log(error.message);
          return;
        });
      imageReferences.push(ref(storage, path).fullPath);
    }

    // Opprett annonse-dokument i firebase med automatisk generert id
    LocalData.ads
      .createNewDocumentWithoutId({
        title: title,
        description: description,
        price: price,
        imageReferences: imageReferences,
        area: area,
        userId: getAuth().currentUser!.uid, // Ettersom bruker må være logget inn for å komme hit, så er det trygt å bruke ! her
      })
      .then(() => {
        alert("Annonse opprettet");
        navigate("/"); // TODO: legg inn link til den opprettede annonsen
      })
      .catch((error) => {
        alert(error.message);
        return;
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
