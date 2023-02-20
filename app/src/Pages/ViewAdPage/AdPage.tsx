import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./AdPage.module.css";
import buttonStyles from "../../GlobalStyling/Buttons.module.css";
import { LocalData } from "../../Data/LocalData";
import { AdsData } from "../../Data/Ads/AdsData";
import { getAuth } from "firebase/auth";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import hammer from "./hammer.png"

export const AdPage = () => {
  const navigate = useNavigate();

  // const [title, setTitle] = useState("");
  // const [description, setDescription] = useState("");
  // const [price, setPrice] = useState(0);
  // const [images, setImages] = useState<File[]>([]);
  // const [area, setArea] = useState("");


    let id = "n8V2nOv66r7dj4sxFvLe";
    let doc = new AdsData(id)
    doc.load().then(() => {
        
    })

    const rentIt = () => {

    }

    return (
      <div id={styles.adPage}>
          <div className={styles.frameRoot}>
              <form className={styles.rentItButton} onSubmit={rentIt}>
              <img className={styles.toolImage}
                    src= {hammer} alt={"Hammer"}
                    // onError={({ currentTarget }) => {
                    //     currentTarget.onerror = null; // prevents looping
                    //     currentTarget.src="app/src/Pages/ViewUserPage/unknown-default-profile.avif";
                    // }}
                    />
                <div className={styles.descriptionContainer}>
                  <div className={styles.text2}> Hammer </div>
                  <div className={styles.text1}> -Besrkivelse </div>
                </div>
                <div className={styles.infoContainer}>
                    <div className={styles.userAndTitle}>
                        <div className={styles.text1}> Område:  </div>
                        <div className={styles.text2}> Sted </div>
                    </div>
                    <div className={styles.CurrentPrice}>
                        <div className={styles.text1}> Pris: </div>
                        <div className={styles.text2}> 20 kr </div>
                    </div>
                </div>
                <button type="submit" className={buttonStyles.rentItButton}>
                    Rent it
                </button>
                <div className={styles.text3}> Kontaktinformasjon 
                  <div className={styles.text1}>Gå til bruker: <Link to="/UserPage">Navn</Link>  </div> 
                  <div className={styles.text1}> tlf:  </div>
                  <div className={styles.text1}> e-mail: </div>
                </div>
              </form>

          </div>
      </div>
    )
  };
  
  export default AdPage;