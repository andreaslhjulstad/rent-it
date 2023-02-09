import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import styles from "./SignInPage.module.css";
import buttonStyles from "../../../GlobalStyling/Buttons.module.css";

export const SignInPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signInUser = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Logg inn
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        navigate("/");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  return (
    <div id={styles.signInPage}>
      <div className={styles.signInContent}>
        <h1>Logg inn</h1>
        <form className={styles.signInForm} onSubmit={signInUser}>
          <label htmlFor="email">Din e-postadresse</label>
          <input type="text" id="email" placeholder="Fyll inn e-postadressen din" onChange={(e) => setEmail(e.target.value)} />
          <label htmlFor="password">Ditt passord</label>
          <input type="password" id="password" placeholder="Fyll inn passordet ditt" onChange={(e) => setPassword(e.target.value)} />
          <button type="submit" className={buttonStyles.mainButton}>
            Logg inn
          </button>
          <Link to="/register">Har du ingen bruker? Trykk her for å opprette en</Link>
        </form>
      </div>
    </div>
  );
};

export default SignInPage;
