import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./AdPage.module.css";
import buttonStyles from "../../../GlobalStyling/Buttons.module.css";
import { LocalData } from "../../Data/LocalData";
import { AdsData } from "../../Data/Ads/AdsData";


export const AdPage = () => {
    let id = "n8V2nOv66r7dj4sxFvLe";
    let doc = new AdsData(id)
    doc.load().then(() => {
        
    })
    return (
      <div>
        <p>Du er logget inn:)</p>
        <Link to="/createAd">Opprett annonse</Link>
      </div>
    )
  };
  
  export default AdPage;