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
  const [filters, setFilters] = useState<any[]>([]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    let value = e.target.value;
    if (filters.includes(value)) {
      const newFilters = filters.filter((filter) => filter !== value);
      setFilters(newFilters)
    } else {
      const newFilters = [...filters];
      newFilters.push(value);
      setFilters(newFilters);
    }
  }

  useEffect(() => {
    LocalData.ads.loadDocuments().then((adsCollection) => {
      setAds(adsCollection.documents);
    });
  }, []);

  useEffect(() => {
    setFilteredAds(
      ads.filter((ad) => ad.title.toLowerCase().includes(search.toLowerCase()))
    )
    if(filters.length > 0) {
      setFilteredAds(
        ads.filter((ad) => ad.category.some(v => filters.includes(v)))
      )
    }
  }, [search, filters, ads])

  return (
    <div id={styles.homePage}>
      <Navbar />
      <div id={styles.filterDiv}>
        <input id={styles.search} type="text" placeholder="search..." onChange={(e) => setSearch(e.target.value)} />
        
        <div id={styles.filters}>
          <div>
            <label>
              <input type="checkbox" value={"Elektroverktøy"} onChange={handleChange}/>
              <span>Elektroverktøy</span>
            </label>
          </div>
          <div>
            <label>
              <input type="checkbox" value={"Håndverktøy"} onChange={handleChange}/> 
              <span>Håndverktøy</span>
            </label>
          </div>
          <div>
          <label>
            <input type="checkbox" value={"Vinter"} onChange={handleChange}/>
            <span>Vinter</span>
          </label>
          </div>
          <div>
          <label>
            <input type="checkbox" value={"Hage"} onChange={handleChange}/>
            <span>Hage</span>
          </label>
          </div>
          <div>
          <label>
            <input type="checkbox" value={"Hobby"} onChange={handleChange}/>
            <span>Hobby</span>
          </label>
          </div>
          <div>
          <label>
            <input type="checkbox" value={"Maling"} onChange={handleChange}/>
            <span>Maling</span>
          </label>
          </div>
          <div>
          <label>
            <input type="checkbox" value={"Hjemmeredskaper"} onChange={handleChange}/>
            <span>Hjemmeredskaper</span>
          </label>
          </div>
        </div>
        
      </div>
      <div data-testid="homePageGrid" id={styles.homePageGrid}>
        {filteredAds.map((ad) => {
          return <AddBox key={ad.id} ad={ad} />;
        })}
      </div>
    </div>
  );
};

export default AdsPage;
