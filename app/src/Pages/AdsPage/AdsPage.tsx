import { collection, getDocs } from "firebase/firestore";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../../App";
import AddBox from "../../Data/Components/AddBox";
import Navbar from "../../Data/Components/navbar/Navbar";
import { LocalData } from "../../Data/LocalData";
import styles from "./AdsPage.module.css";

export const AdsPage = () => {
  let ads: any[] = [];

  const [adBoxes, setAdBoxes] = useState<any[]>([]);

  useEffect(() => {
    getDocs(collection(db, "ads")).then((docSnap) => {
      docSnap.forEach(async (doc) => {
        const docData = doc.data();

        const title = docData.title;
        const price = docData.price;
        const area = docData.area;
        const id = doc.id;

        let imageURL: string;
        const storage = getStorage();
        if (docData.images !== undefined) {
          const url = await getDownloadURL(ref(storage, docData.images[0]));
          imageURL = url;
        } else {
          const placeholder = await getDownloadURL(ref(storage, "images/ads/placeholder-image (1).png"));
          imageURL = placeholder;
        }

        const ad = {
          title: title,
          price: price,
          image: imageURL,
          area: area,
          id: id,
        };

        ads = [...ads, ad];

        setAdBoxes(
          ads.map((ad) => {
            return <AddBox item={ad} />;
          })
        );
      });
    });
  }, []);

  return (
    <div id={styles.homePage}>
      <Navbar />
      <div data-testid="homePageGrid" id={styles.homePageGrid}>{adBoxes}</div>
    </div>
  );
};

export default AdsPage;
