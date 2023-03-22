import { Link } from "react-router-dom";
import styles from "./AddBox.module.css";
import { AdData } from "../Ads/AdData";
import { useEffect, useState } from "react";

interface AddBoxProps {
  ad: AdData;
  
}

export const AddBox = (props: AddBoxProps) => {
  const adLink = "/ad/" + props.ad.id;
  const [image, setImage] = useState("");

  useEffect(() => {
    props.ad.loadImages().then((ad) => {
      setImage(ad.loadedImages[0]);
    });
  }, [props.ad]);
  return (
    <div id={props.ad.id}>
      <Link style={{ textDecoration: "none" }} to={adLink}>
        <div id={styles.addBox}>
          <img id={props.ad.isRented ?  styles.rentedImage : styles.image} src={image} alt="" />
          <div id={styles.priceDiv}>
            <p id={styles.price}>{props.ad.price} kr</p>
          </div>
          <hr />
          <div id={styles.text}>
            <p id={styles.area}>{props.ad.area}</p>
            <h2>{props.ad.title}</h2>
          </div>
          {props.ad.isRented ? <p id={styles.rented}> Utiligjengelig nå, men mulig å inngå leieavtale</p> : <p></p>}
          
        </div>
      </Link>
    </div>
  );
};

export default AddBox;
