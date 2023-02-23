import { useEffect, useState } from "react";
import styles from "./UserPage.module.css";
import buttonStyles from "../../GlobalStyling/Buttons.module.css";
import defaultImage from "./unknown-default-profile.png";
import Navbar from "../../Data/Components/navbar/Navbar";
import { UserData } from "../../Data/Users/UserData";
import { useParams } from "react-router-dom";

export const UserPage = () => {
  const [user, setUser] = useState<UserData | null>(null);
  const params = useParams()

  useEffect(() => {
    let doc: any;
    if (params.userID) {
      let id = params.userID;
      doc = new UserData(id);
    }
  
    doc
      .load()
      .then(() => {
        console.log(doc);
        setUser(doc);
      })
      .catch((error: any) => {
        console.log(error);
      });
  }, []);

  return (
    <div id={styles.userPage}>
      <Navbar />
      <div className={styles.userContent}>
        <h1> {user?.name} </h1>
        <form className={styles.userPageForm}>
          <img
            className={styles.userImage}
            src={defaultImage}
            alt={"Bruker"}
            // onError={({ currentTarget }) => {
            //     currentTarget.onerror = null; // prevents looping
            //     currentTarget.src="app/src/Pages/ViewUserPage/unknown-default-profile.avif";
            // }}
          />
          <form className={styles.userPageInfo}>
            <label className={styles.text} htmlFor="email">
              E-postadresse: {user?.email}{" "}
            </label>
            <label className={styles.text} htmlFor="phoneNumber">
              Telefon-nummer: {user?.phoneNumber}{" "}
            </label>
            <button type="submit" className={buttonStyles.mainButton}>
              Send melding
            </button>
          </form>
        </form>
      </div>
    </div>
  );
};

export default UserPage;
