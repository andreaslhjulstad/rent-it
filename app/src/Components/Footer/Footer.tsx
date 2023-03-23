import { getAuth } from "firebase/auth";
import { useEffect, useState } from "react";
import styles from "./Footer.module.css";

export const Footer = () => {
  return (
    <div id={styles.footerDiv}>
      <footer className={styles.footer}>
        <div className={styles.waves}>
          <div className={styles.wave} id={styles.wave1}></div>
          <div className={styles.wave} id={styles.wave2}></div>
          <div className={styles.wave} id={styles.wave3}></div>
          <div className={styles.wave} id={styles.wave4}></div>
        </div>
        <p>&copy;2023 RentIt | All Rights Reserved</p>
      </footer>
    </div>
  )
};

export default Footer;