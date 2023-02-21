import { useEffect, useState } from "react";
import styles from "./UserPage.module.css";
import buttonStyles from "../../GlobalStyling/Buttons.module.css";
import defaultImage from "./unknown-default-profile.png";
import { UserData } from "../../Data/Users/UserData";
import { useSearchParams } from "react-router-dom";

export const UserPage = () => {
  const [user, setUser] = useState<UserData | null>(null);

  useEffect(() => {
    let id = "Ci12RGyrRdg2lvH1kqwUXQZ6q1q1";
    let doc = new UserData(id);
    doc
      .load()
      .then( () => {
        console.log(doc);
        setUser(doc);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const [searchparams] = useSearchParams();
  console.log(searchparams.get("state"));


  return (
      <div id={styles.userPage}>
        <div className={styles.userContent}>
          <h1> {user?.name} </h1>
          <form className={styles.userPageForm}>
              <img className={styles.userImage}
                  src= {defaultImage} alt={"Bruker"}
                  // onError={({ currentTarget }) => {
                  //     currentTarget.onerror = null; // prevents looping
                  //     currentTarget.src="app/src/Pages/ViewUserPage/unknown-default-profile.avif";
                  // }}
                  />
              <form className={styles.userPageInfo}>
                  <label className={styles.text} htmlFor="email">E-postadresse: {user?.email} </label>
                  <label className={styles.text} htmlFor="phoneNumber">Telefon-nummer: {user?.phoneNumber} </label>
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