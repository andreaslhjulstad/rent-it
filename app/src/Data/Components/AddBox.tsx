import { JSXElementConstructor, ReactElement, ReactFragment, ReactPortal, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./AddBox.module.css";
import buttonStyles from "../../../GlobalStyling/Buttons.module.css";
import { getDownloadURL, getStorage } from "@firebase/storage";



export const AddBox = (props: any) => {
    let ids = props.item.id;

    const getId = (event: { currentTarget: { id: any; }; }) => {
        console.log(event.currentTarget.id);
    };

    const adLink = "/ad?=" + ids;

    return (
        <div id={ids} onClick={getId}>
            <Link style={{ textDecoration: 'none' }} to={adLink}>
                <div id={styles.addBox}>
                    <img src={props.item.image} alt="" />
                    <div id={styles.priceDiv}>
                        <p id={styles.price}>{props.item.price} kr</p>
                    </div>
                    <hr />
                    <div id={styles.text}>
                        <p id={styles.area}>{props.item.area}</p>
                        <h2>{props.item.title}</h2>
                    </div>
                </div>
            </Link>
        </div>
    )
  };
  
  export default AddBox;