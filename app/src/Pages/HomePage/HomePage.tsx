import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../../App";
import { AdData } from "../../Data/Ads/AdData";
import AddBox from "../../Data/Components/AddBox";
import { LocalData } from "../../Data/LocalData";
import styles from "./HomePage.module.css";

export const HomePage = () => {
  const [ads, setAds] = useState<AdData[]>([]);

  useEffect(() => {
    LocalData.ads
      .loadDocuments()
      .then((ads) => {
        setAds(ads.documents);
      })
      .catch((error) => {
        console.log(error);
      });
  });

  return (
    <div id={styles.homePage}>
      <div id={styles.homePageGrid}>
        {ads.map((ad) => {
          return <AddBox key={ad.id} ad={ad} />;
        })}
      </div>
      <p>Du er logget inn:)</p>
      <Link to="/createAd">Opprett annonse</Link>
      <button onClick={() => LocalData.signOutFirebaseUser()}>Logg ut</button>
      <Link to="/AdPage">Se annonse</Link>
      <Link to="/UserPage">Kontaktinformasjon</Link>
    </div>
  );
};

export default HomePage;
