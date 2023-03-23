import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import styles from "./AdPage.module.css";
import buttonStyles from "../../GlobalStyling/Buttons.module.css";
import { LocalData } from "../../Data/LocalData";
import { AdData } from "../../Data/Ads/AdData";
import { UserData } from "../../Data/Users/UserData";
import Navbar from "../../Data/Components/navbar/Navbar";
import RatingSection from "../../Components/Rating/RatingSection/RatingSection";
import { Firestore } from "@firebase/firestore";
import { getAuth } from "firebase/auth";

export const AdPage = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [ad, setAd] = useState<AdData | null>(null);
  const [user, setUser] = useState<UserData | null>(null);
  const userLink = "/user/" + user?.id;
  const [buttonContent, setButtonContent] = useState("☆")
  let adminID: string = "jh02wt57FvX8sbb6oxV0eK2Htbq1";

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
    let test = getAuth().currentUser?.uid as String
    async function fetchData() {
      if (await LocalData.users.getFavs(ad?.id, test)) {
      setButtonContent("★");
      }
    }
    fetchData();
  }, [params, ad?.id]);

  const rentIt = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (ad) {
      window.location.href = `/loanAgreement/${ad.id}`;
    }
  };

  const deleteAd = () => {
    if (ad) {
      LocalData.ads
        .deleteDocument(ad)
        .then(() => {
          alert("Annonsen din er slettet");
          navigate("/AdsPage");
        })
        .catch((error) => {
          alert(error.message);
        });
    }
  };


  const addToFavorites = async () => { 
    let test = LocalData.currentUser?.id as string
    if (await LocalData.users.addNewFavorite(ad?.id, test)) {
      setButtonContent("★")
    } else {
      setButtonContent("☆")
    }
    
  }

  return (
    <div id={styles.adPage}>
      <Navbar />
      <div id={styles.adContent}>
        <div className={styles.frameRoot}>
          <form className={styles.rentItButton} onSubmit={rentIt}>
          <div>
          <button id={styles.favoriteButton} type="button" onClick={addToFavorites}><span>{buttonContent}</span></button>
          <img
          className={styles.toolImage}
          src={ad?.loadedImages[0]}
          // onError={({ currentTarget }) => {
          //     currentTarget.onerror = null; // prevents looping
          //     currentTarget.src="app/src/Pages/ViewUserPage/unknown-default-profile.avif";
          // }}
        />
          </div>
            
            <div className={styles.descriptionContainer}>
              <div className={styles.text2}>{ad?.title}</div>
              <div className={styles.text1}>
                Utleier: <Link to={userLink}>{user?.name}</Link>{" "}
              </div>
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
            {(LocalData.currentUser?.id === user?.id || LocalData.currentUser?.id === adminID) && (
              <div className={styles.adminSettings}>
                <button type="button" onClick={deleteAd} className={buttonStyles.rentItButton} id={styles.deleteButton}>
                  Slett annonse
                </button>
              </div>
            )}
          </form>
        </div>
        <RatingSection ad={ad ?? undefined} />
        </div>
    </div>
  );
};

export default AdPage;
