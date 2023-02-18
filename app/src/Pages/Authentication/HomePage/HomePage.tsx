import { collection, getDocs } from "firebase/firestore";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../../../App";
import { AllAdsData } from "../../../Data/Ads/AllAdsData";
import AddBox from "../../../Data/Components/AddBox";
import styles from "./HomePage.module.css";


export const HomePage = () => {
  let ads: any[] = []

  const [adBoxes, setAdBoxes] = useState<any[]>([]);

  useEffect(() => {
    getDocs(collection(db, "ads")).then((docSnap) => {
      docSnap.forEach(async (doc) => {
        const docData = doc.data();

        const title = docData.title;
        const price = docData.price;
        const area = docData.area;
        const id = doc.id;

        let imageURL: string
        const storage = getStorage();
        if (docData.images !== undefined) {
          const url = await getDownloadURL(ref(storage, docData.images[0]));
          imageURL = url;
        }
        else {
          imageURL = "";
        }

        const ad = {
          title: title,
          price: price,
          image: imageURL,
          area: area,
          id: id
        }

        ads = [...ads, ad];

        setAdBoxes(ads.map((ad) => {
          return (
            <AddBox
              item={ad}
            />
          )
        }));
      });
    });
  },[]);

  return (
    <div id={styles.homePage}>
      <div id={styles.homePageGrid}>
      {adBoxes}
      </div>
      <p>Du er logget inn:)</p>
      <Link to="/createAd">Opprett annonse</Link>
      <Link to="/AdPage">Se annonse</Link>
    </div>
  )
}

export default HomePage;
