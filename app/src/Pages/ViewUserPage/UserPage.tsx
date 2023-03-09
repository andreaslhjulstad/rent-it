import { useEffect, useState } from "react";
import styles from "./UserPage.module.css";
import buttonStyles from "../../GlobalStyling/Buttons.module.css";
import defaultImage from "./unknown-default-profile.png";
import Navbar from "../../Data/Components/navbar/Navbar";
import { UserData } from "../../Data/Users/UserData";
import { useParams } from "react-router-dom";
import RatingSection from "../../Components/Rating/RatingSection/RatingSection";

export const UserPage = () => {
  const [user, setUser] = useState<UserData | undefined>(undefined);
  const params = useParams();

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
      <div id={styles.userContent}>
        <div className={styles.profileContent}>
          <h1> {user?.name} </h1>
          <div className={styles.userPageForm}>
            <img
              className={styles.userImage}
              src={defaultImage}
              alt={"Bruker"}
              // onError={({ currentTarget }) => {
              //     currentTarget.onerror = null; // prevents looping
              //     currentTarget.src="app/src/Pages/ViewUserPage/unknown-default-profile.avif";
              // }}
            />
            <div className={styles.userPageInfo}>
              <label className={styles.text} htmlFor="email">
                E-postadresse: {user?.email}{" "}
              </label>
              <label className={styles.text} htmlFor="phoneNumber">
                Telefon-nummer: {user?.phoneNumber}{" "}
              </label>
              <button type="submit" className={buttonStyles.mainButton}>
                Send melding
              </button>
            </div>
          </div>
        </div>
        <RatingSection user={user} />
      </div>
    </div>
  );
};

export default UserPage;
