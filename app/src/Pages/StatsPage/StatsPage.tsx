import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Footer from "../../Components/Footer/Footer";
import { StatsElement } from "../../Components/Stats/StatsElement/StatsElement";

import { AdData } from "../../Data/Ads/AdData";
import Navbar from "../../Data/Components/navbar/Navbar";
import { LocalData } from "../../Data/LocalData";
import { UserData } from "../../Data/Users/UserData";
import styles from "./StatsPage.module.css";

export const StatsPage = () => {
  const params = useParams();
  const [userAds, setUserAds] = useState<AdData[]>([]);

  useEffect(() => {
    if (params.userID) {
      let id = params.userID;
      let userDoc = new UserData(id);
      // Laster inn brukerdata
      userDoc.load().then(() => {
        // Laster inn brukerens tilhørende annonser
        LocalData.ads.loadDocuments().then((adsCollection) => {
          setUserAds(
            adsCollection.documents.filter(
              (ad) => ad.user?.id === params.userID
            )
          );
        });
      });
    }
  }, [params.userID]);

  return (
    <div>
      <div style={{paddingBottom: "80px"}}>
      <Navbar />
      </div>
      <div data-testid="statsPageContent" className={styles.statsPageContent}>
        <h1>Statistikk for dine annonser</h1>
        <div data-testid="adsStatisticsList">
          {userAds.map((ad) => {
            return <StatsElement key={ad.id} ad={ad} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default StatsPage;
