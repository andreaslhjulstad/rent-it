import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styles from "./AdPage.module.css";
import buttonStyles from "../../GlobalStyling/Buttons.module.css";
import { LocalData } from "../../Data/LocalData";
import { AdData } from "../../Data/Ads/AdData";
import hammer from "./hammer.png";
import { UserData } from "../../Data/Users/UserData";

export const AdPage = () => {
  const params = useParams();
  const [ad, setAd] = useState<AdData | null>(null);
  const [user, setUser] = useState<UserData | null>(null);

  useEffect(() => {
    // Velger standard eiendom om pId er i URL
    if (params.adID && params.adID !== ad?.id) {
      const adData = LocalData.ads.addData(params.adID);
      const loadUserAndImages = () => {
        adData
          .loadImages()
          .then(() => {
            setAd(adData);
          })
          .catch((error) => {
            setAd(adData);
          });

        if (!adData.user?.loaded) {
          adData.user
            ?.load()
            .then(() => {
              if (adData.user) setUser(adData.user);
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          setUser(adData.user);
        }
      };
      if (!adData.loaded) {
        adData.load().then(async () => {
          loadUserAndImages();
        });
      } else {
        loadUserAndImages();
      }
    }
  }, [params, ad?.id]);

  const rentIt = () => {};

  return (
    <div id={styles.adPage}>
      <div className={styles.frameRoot}>
        <form className={styles.rentItButton} onSubmit={rentIt}>
          <img
            className={styles.toolImage}
            src={ad?.loadedImages[0]}
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
            <div className={styles.text1}> tlf: {user?.phoneNumber} </div>
            <div className={styles.text1}> e-mail: {user?.email} </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdPage;
