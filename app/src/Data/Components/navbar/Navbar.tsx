import { getAuth } from "firebase/auth";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { LocalData } from "../../LocalData";
import styles from "./Navbar.module.css";
import "./Navbar.module.css";

export const Navbar = () => {

  const userLink = "/user/" + getAuth().currentUser?.uid;

  //Bytter mellom light- og dark-mode
  const [theme, setTheme] = useState(
    localStorage.getItem('theme') || 'light'
  );
  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  };

  //Oppdaterer til klassene til temaet
  //localStorage bevarer ved refresh av siden
  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.body.className = theme;
  }, [theme]);

  return (
    <div className={`main ${theme}`}>
      <nav id={styles.navBar}>
          <ul id={styles.navList}>
              <li><Link to="/">Hjem</Link></li>
              <li><Link to="/AdsPage">Se annonser</Link></li>
              <li><Link to={userLink}>Profil</Link></li>
              <li><Link to="/createAd">Opprett annonse</Link></li>
              <div>
              <li><button id={styles.darkMode} onClick={toggleTheme}>Bytt lysmodus</button></li>
              <li><button id={styles.logOut} onClick={() => LocalData.signOutFirebaseUser()}>Logg ut</button></li>
              </div>
          </ul>
      </nav>
    </div>
  )
};

export default Navbar;
