import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import styles from "./AdPage.module.css";
import buttonStyles from "../../../GlobalStyling/Buttons.module.css";
import { LocalData } from "../../Data/LocalData";
import { AdsData } from "../../Data/Ads/AdsData";


export const AdPage = () => {
    const [searchparams] = useSearchParams();
    console.log(searchparams.get("state"))
    
    return (
      <div>
        <p>Du er logget inn:)</p>
        <Link to="/createAd">Opprett annonse</Link>
      </div>
    )
  };
  
  export default AdPage;