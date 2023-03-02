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
  const [search, setSearch] = useState("");
  const [filteredAds, setFilteredAds] = useState<AdData[]>([]);

  useEffect(() => {
    LocalData.ads.loadDocuments().then((adsCollection) => {
      setAds(adsCollection.documents);
    });
  }, []);

  useEffect(() => {
    setFilteredAds(
      ads.filter((ad) => ad.title.toLowerCase().includes(search.toLowerCase()))
    )
  }, [search, ads])

  return (
    <div id={styles.homePage}>
      <Navbar />
      <div id={styles.filterDiv}>
        <input type="text" placeholder="search..." onChange={(e) => setSearch(e.target.value)} />
      </div>
      <div data-testid="homePageGrid" id={styles.homePageGrid}>
        {filteredAds.length === 0 ? <h1>Ingen annonser funnet</h1> : filteredAds.map((ad) => {
          return <AddBox key={ad.id} ad={ad} />;
        })}
      </div>
    </div>
  );
};

export default AdsPage;
