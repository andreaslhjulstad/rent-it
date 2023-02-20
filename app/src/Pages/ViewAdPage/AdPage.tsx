import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import styles from "./AdPage.module.css";
import buttonStyles from "../../GlobalStyling/Buttons.module.css";
import { LocalData } from "../../Data/LocalData";
import { AdData } from "../../Data/Ads/AdData";
import { getAuth } from "firebase/auth";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import hammer from "./hammer.png";
import { UserData } from "../../Data/Users/UserData";

export const AdPage = () => {
  const navigate = useNavigate();
  const [ad, setAd] = useState<AdData | null>(null);
  const [user, setUser] = useState<UserData | null>(null);

  useEffect(() => {
    let adId = "X80qADiJlaafmtICWA14";
    let userId = "Ci12RGyrRdg2lvH1kqwUXQZ6q1q1";
    let doc = new AdData(adId);
    let doc2 = new UserData(userId);
    doc
      .load()
      .then(() => {
        console.log(doc);
        setAd(doc);
      })
      .catch((error) => {
        console.log(error);
      });
    doc2
      .load()
      .then(() => {
        console.log(doc2);
        setUser(doc2);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const rentIt = () => {};

  const [searchparams] = useSearchParams();
  console.log(searchparams.get("state"));

  return (
    <div id={styles.adPage}>
      <div className={styles.frameRoot}>
        <form className={styles.rentItButton} onSubmit={rentIt}>
          <img
            className={styles.toolImage}
            src={hammer}
            alt={"Hammer"}
            // onError={({ currentTarget }) => {
            //     currentTarget.onerror = null; // prevents looping
            //     currentTarget.src="app/src/Pages/ViewUserPage/unknown-default-profile.avif";
            // }}
          />
          <div className={styles.descriptionContainer}>
            <div className={styles.text2}>{ad?.title}</div>
            <div className={styles.text1}>{ad?.description}</div>
          </div>
          <div className={styles.infoContainer}>
            <div className={styles.userAndTitle}>
              <div className={styles.text1}> Område: </div>
              <div className={styles.text2}>{ad?.area}</div>
            </div>
            <div className={styles.CurrentPrice}>
              <div className={styles.text1}> Pris: </div>
              <div className={styles.text2}> {ad?.price} </div>
            </div>
          </div>
          <button type="submit" className={buttonStyles.rentItButton}>
            Rent it
          </button>
          <div className={styles.text3}>
            {" "}
            Kontaktinformasjon
            <div className={styles.text1}>
              Gå til bruker: <Link to="/UserPage"> {user?.name} </Link>{" "}
            </div>
            <div className={styles.text1}> tlf: {user?.phoneNumber}  </div>
            <div className={styles.text1}> e-mail: {user?.email} </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdPage;
