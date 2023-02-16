import { Link } from "react-router-dom";
import { AllAdsData } from "../../../Data/Ads/AllAdsData";
import AddBox from "../../../Data/Components/AddBox";
import styles from "./HomePage.module.css";


export const HomePage = () => {
  let doc = new AllAdsData()
  doc.loadAll().then(() => {
      
  })
    
  return (
    <div>
      <div id={styles.homePage}>
        <AddBox />
        <AddBox />
      </div>
      <p>Du er logget inn:)</p>
      <Link to="/createAd">Opprett annonse</Link>
      <Link to="/AdPage">Se annonse</Link>
    </div>
  )
};

export default HomePage;
