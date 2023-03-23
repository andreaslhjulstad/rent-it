import { useEffect, useState } from "react";
import styles from "./UserPage.module.css";
import buttonStyles from "../../GlobalStyling/Buttons.module.css";
import defaultImage from "./unknown-default-profile.png";
import Navbar from "../../Data/Components/navbar/Navbar";
import { UserData } from "../../Data/Users/UserData";
import { useNavigate, useParams } from "react-router-dom";
import RatingSection from "../../Components/Rating/RatingSection/RatingSection";
import { getAuth } from "firebase/auth";
import AddBox from "../../Data/Components/AddBox";
import { LocalData } from "../../Data/LocalData";
import { AdData } from "../../Data/Ads/AdData";
import Footer from "../../Components/Footer/Footer";

export const UserPage = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState<UserData | null>(null);
  const [userAds, setUserAds] = useState<AdData[]>([]);
  const [favorites, setFavorites] = useState<AdData[]>([]);
  const [adsHeader, setAdsHeader] = useState("");
  const params = useParams();
  const [profilePicture, setProfilePicture] = useState(defaultImage);

  const isCurrentUser = () => {
    return params.userID === getAuth().currentUser?.uid;
  };

  useEffect(() => {
    if (params.userID) {
      let id = params.userID;
      let doc = new UserData(id);

      doc
        .load()
        .then(async () => {
          setUser(doc);

          if (isCurrentUser()) {
            setAdsHeader("Mine annonser");
          } else {
            if (doc.name.endsWith("s") || doc.name.endsWith("S")) {
              setAdsHeader(doc.name + " sine annonser");
            } else {
              setAdsHeader(doc.name + "s annonser");
            }
          }
          if (doc.image) {
            setProfilePicture(doc.image);
          }
          const allAds = await LocalData.ads.loadDocuments();
          setUserAds(allAds.documents.filter((ad) => ad.user?.id === doc.id));
          console.log(allAds.documents.filter((ad) => ad.user?.id === doc.id).map((ad) => ad.isRented));
        })
        .catch((error: any) => {
          console.log(error);
        });

      doc
        .load()
        .then(async () => {
          console.log(doc);
          setUser(doc);
          const fav = await LocalData.ads.loadDocuments();
          setFavorites(fav.documents.filter((ad) => doc.favorites.includes(ad.id)));
        })
        .catch((error: any) => {
          console.log(error);
        });
    }
  }, [params.userID]);

  return (
    <div>
      <div style={{paddingBottom: "80px"}}>
      <Navbar />
      </div>
      <div className={styles.userPageContent}>
        <div data-testid="userContent" className={styles.userContent}>
          <h1>Brukerprofil</h1>
          <div className={styles.userInfo}>
            <div className={styles.image}>
              <img data-testid="userPicture" src={profilePicture} alt={"Bruker"} />
            </div>
            <div className={styles.userPageInfo}>
              <h2 data-testid="userName"> {user?.name} </h2>
              <p data-testid="userEmail">
                E-post: <a href={"mailto:" + user?.email}>{user?.email}</a>{" "}
              </p>
              <p data-testid="userPhoneNum">
                Telefon: <a href={"tel:" + user?.phoneNumber}>{user?.phoneNumber}</a>{" "}
              </p>
            </div>
          </div>
          <div className={styles.buttons}>
            {isCurrentUser() ? (
              <button className={buttonStyles.otherButton} onClick={() => navigate(`/user/${params.userID}/stats`)}>
                Se statistikk for annonser
              </button>
            ) : (
              ""
            )}
            {user?.id === LocalData.currentUser?.id && (
              <button onClick={() => navigate("/loanHistory")} className={buttonStyles.otherButton}>
                {"Se historikk over dine leieavtaler"}
              </button>
            )}
          </div>
          <div className={styles.userAdsSection}>
            <h3>{adsHeader}</h3>
            <div data-testid="userAdsList" className={styles.userAdsList}>
              {userAds.map((ad) => {
                return <AddBox key={ad.id} ad={ad} />;
              })}
            </div>
            {isCurrentUser() ? <h3>Favoritt-annonser</h3> : ""}
            <div data-testid="favoriteAds" className={styles.userAdsList}>
              {isCurrentUser() ? 
                (favorites.map((ad) => {
                  return <AddBox key={ad.id} ad={ad} />;
                })) : ""
              }
            </div>
          </div>
        </div>
        <RatingSection user={user!} />
      </div>
      <Footer />
    </div>
  );
};

export default UserPage;
