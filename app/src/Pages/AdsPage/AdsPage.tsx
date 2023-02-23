import { collection, getDocs } from "firebase/firestore";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../../App";
import { AdData } from "../../Data/Ads/AdData";
import AddBox from "../../Data/Components/AddBox";
import Navbar from "../../Data/Components/navbar/Navbar";
import { LocalData } from "../../Data/LocalData";
import styles from "./AdsPage.module.css";

export const AdsPage = () => {
  const [ads, setAds] = useState<AdData[]>([]);

  useEffect(() => {
    LocalData.ads.loadDocuments().then((adsCollection) => {
      setAds(adsCollection.documents);
    });
  }, []);

  return (
    <div id={styles.homePage}>
      <Navbar />
      <div id={styles.homePageGrid}>
        {ads.map((ad) => {
          return <AddBox key={ad.id} ad={ad} />;
        })}
      </div>
    </div>
  );
};

export default AdsPage;
