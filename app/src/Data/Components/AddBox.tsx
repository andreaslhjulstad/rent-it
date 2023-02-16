import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./AddBox.module.css";
import buttonStyles from "../../../GlobalStyling/Buttons.module.css";



export const AddBox = () => {
    return (
        <div id={styles.addBox}>
        <img src="" alt="" />
        <h2>Title</h2>
        <p>Prize</p>
        <Link to="/AdPage">Gå til anonse</Link>
      </div>
    )
  };
  
  export default AddBox;