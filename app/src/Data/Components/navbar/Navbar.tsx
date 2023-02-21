import { Link } from "react-router-dom";
import { LocalData } from "../../LocalData";
import styles from "./Navbar.module.css";

export const Navbar = () => {
  return (
    <nav id={styles.navBar}>
        <ul id={styles.navList}>
            <li><Link to="/">Hjem</Link></li>
            <li><Link to="/AdsPage">Se annonser</Link></li>
            <li><Link to="/UserPage">Profil</Link></li>
            <li><Link to="/createAd">Opprett annonse</Link></li>
            <li><button id={styles.logOut} onClick={() => LocalData.signOutFirebaseUser()}>Log ut</button></li>
        </ul>
    </nav>
  )
};

export default Navbar;
