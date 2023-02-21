import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./UserPage.module.css";
import buttonStyles from "../../GlobalStyling/Buttons.module.css";
import { getAuth } from "firebase/auth";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { LocalData } from "../../Data/LocalData";
import { updateDoc } from "firebase/firestore";
import defaultImage from "./unknown-default-profile.png";
import Navbar from "../../Data/Components/navbar/Navbar";

export const UserPage = () => {

    return (
        <div id={styles.userPage}>
          <Navbar />
          <div className={styles.userContent}>
            <h1>Navn</h1>
            <form className={styles.userPageForm}>
                <img className={styles.userImage}
                    src= {defaultImage} alt={"Bruker"}
                    // onError={({ currentTarget }) => {
                    //     currentTarget.onerror = null; // prevents looping
                    //     currentTarget.src="app/src/Pages/ViewUserPage/unknown-default-profile.avif";
                    // }}
                    />
                <form className={styles.userPageInfo}>
                    <label className={styles.text} htmlFor="email">E-postadress</label>
                    <label className={styles.text} htmlFor="phoneNumber">Tlf-nummer</label>
                    <button type="submit" className={buttonStyles.mainButton}>
                        Send melding
                    </button>
                </form>
            </form>
          </div>
        </div>
      );


}

export default UserPage;