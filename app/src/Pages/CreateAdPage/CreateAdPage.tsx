import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./CreateAdPage.module.css";
import buttonStyles from "../../GlobalStyling/Buttons.module.css";

export const CreateAdPage = () => {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [images, setImages] = useState<File[]>([]);
  const [area, setArea] = useState("");

  const createAd = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: legg til validering og oppretting/lagring av annonse

    // Validering

    // Opprett annonse

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
            onChange={(e) => (setTitle(e.target.value))}
          />
          <label htmlFor="description">
            Beskrivelse av annonse:
            <span className={styles.required}>&nbsp;*</span>
          </label>
          <textarea
            id="description"
            placeholder="Fyll inn beskrivelse"
            onChange={(e) => (setDescription(e.target.value))}
          />
          <label htmlFor="price">
            Pris på annonse:
            <span className={styles.required}>&nbsp;*</span>
          </label>
          <input
            type="text"
            id="price"
            placeholder="Fyll inn pris"
            onChange={(e) => (setPrice(parseInt(e.target.value)))}
          />
          <label htmlFor="image">
            Legg ved bilde(r) til annonsen (valgfritt):
          </label>
          <input
            type="file"
            id="image"
            accept="image/png, image/jpeg"
            multiple
            onChange={(e) => {setImages(Array.from(e.target.files ?? []))}}
          />
          <label htmlFor="area">
            Hvilket område befinner du deg i?
            <span className={styles.required}>&nbsp;*</span>
          </label>
          <input
            type="text"
            id="area"
            placeholder="Fyll inn område"
            onChange={(e) => (setArea(e.target.value))}
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