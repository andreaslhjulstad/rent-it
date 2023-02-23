import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import styles from "./AdPage.module.css";
import buttonStyles from "../../GlobalStyling/Buttons.module.css";
import { LocalData } from "../../Data/LocalData";
import { AdData } from "../../Data/Ads/AdData";
import hammer from "./hammer.png";
import { UserData } from "../../Data/Users/UserData";
import Navbar from "../../Data/Components/navbar/Navbar";

export const AdPage = () => {
  const navigate = useNavigate();
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
          .catch((error: any) => {
            console.log(error);
          });

        if (!adData.user?.loaded) {
          adData.user
            ?.load()
            .then(() => {
              if (adData.user) setUser(adData.user);
            })
            .catch((error: any) => {
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

  const rentIt = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (ad) {
      window.location.href = `/loanAgreement/${ad.id}`;
    }
  };

  return (
    <div id={styles.adPage}>
      <Navbar />
      <div className={styles.frameRoot}>
        <form className={styles.rentItButton} onSubmit={rentIt}>
          <img
            className={styles.toolImage}
            src={ad?.loadedImages[0]}
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
              <div className={styles.text1}>Område:</div> 
              <div className={styles.text2}>{ad?.area}</div>
            </div>
            <div className={styles.CurrentPrice}>
              <div className={styles.text1}>Pris:</div>
              <div className={styles.text2}> {ad?.price} </div>
            </div>
          </div>
          <button type="submit" className={buttonStyles.rentItButton}>
            Rent it
          </button>
          <div className={styles.text3}>
            {" "}
            Kontaktinformasjon
            <div className={styles.text1}>Gå til bruker:<Link to="/UserPage"> {user?.name} </Link>{" "}</div>
            <div className={styles.text1}>tlf: {user?.phoneNumber}</div>
            <div className={styles.text1}>e-mail: {user?.email}</div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdPage;
