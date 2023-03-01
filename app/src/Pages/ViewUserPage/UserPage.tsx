import { useEffect, useState } from "react";
import styles from "./UserPage.module.css";
import buttonStyles from "../../GlobalStyling/Buttons.module.css";
import defaultImage from "./unknown-default-profile.png";
import Navbar from "../../Data/Components/navbar/Navbar";
import { UserData } from "../../Data/Users/UserData";
import { useParams } from "react-router-dom";
import { getAuth } from "firebase/auth";
import AddBox from "../../Data/Components/AddBox";
import { LocalData } from "../../Data/LocalData";
import { AdData } from "../../Data/Ads/AdData";

export const UserPage = () => {
  const [user, setUser] = useState<UserData | null>(null);
  const [userAds, setUserAds] = useState<AdData[]>([]);
  const [adsHeader, setAdsHeader] = useState("");
  const params = useParams()

  useEffect(() => {
    let doc: any;
    if (params.userID) {
      let id = params.userID;
      doc = new UserData(id);
    }

    doc
      .load()
      .then(async () => {
        setUser(doc);

        if (params.userID === getAuth().currentUser?.uid) {
          setAdsHeader("Mine annonser");
        } else {
          if (doc.name.endsWith("s") || doc.name.endsWith("S")) {
            setAdsHeader(doc.name + " sine annonser");
          } else {
            setAdsHeader(doc.name + "s annonser");
          }
        }
        const allAds = await LocalData.ads.loadDocuments();
        setUserAds(allAds.documents.filter((ad) => ad.user?.id === doc.id));
      })
      .catch((error: any) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <Navbar />
      <div className={styles.userContent}>
        <h1>Brukerprofil</h1>
          <div className={styles.userInfo}>
            <div className={styles.image}>
              <img src={defaultImage} alt={"Bruker"}
                // onError={({ currentTarget }) => {
              //     currentTarget.onerror = null; // prevents looping
              //     currentTarget.src="app/src/Pages/ViewUserPage/unknown-default-profile.avif";
              // }}
              />
            </div> 
            <div className={styles.userPageInfo}>
              <h2> {user?.name} </h2>
              <p>E-post: <a href={"mailto:" + user?.email}>{user?.email}</a>{" "}</p>
              <p>Telefon: <a href={"tel:" + user?.phoneNumber}>{user?.phoneNumber}</a>{" "}</p>
            {/* onClick={() => {navigator.clipboard.writeText(this.state.textToCopy)}} */}
            {/*  <button type="submit" className={buttonStyles.mainButton}>
                Send melding
              </button> */}
            </div>
          </div>
          <div className={styles.userAdsSection}>
            <h3>{adsHeader}</h3>
            <div className={styles.userAdsList}>
              {userAds.map((ad) => {
                return <AddBox key={ad.id} ad={ad} />;
              })}
            </div>
          </div>
      </div>
    </div>
  );
};

export default UserPage;
