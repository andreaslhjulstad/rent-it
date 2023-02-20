import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import styles from "./SignInPage.module.css";
import buttonStyles from "../../../GlobalStyling/Buttons.module.css";

export const SignInPage = () => {
  const navigate = useNavigate();

  const [displayErrorMessage, setDisplayErrorMessage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signInUser = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email === "") {
      setDisplayErrorMessage("Du må fylle inn e-postadressen din");
      emptyErrorMessageOnDelay(5000);
      return;
    } else if (password === "") {
      setDisplayErrorMessage("Du må fylle inn passordet ditt");
      emptyErrorMessageOnDelay(5000);
      return;
    }
    // Logg inn
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        navigate("/");
        // ...
      })
      .catch((error) => {});
  };

  const forgottenPassword = () => {
    const auth = getAuth();
    if (email === "") {
      setDisplayErrorMessage("Du må fylle inn e-postadressen din");
      emptyErrorMessageOnDelay(5000);
      return;
    }
    sendPasswordResetEmail(auth, email)
      .then(() => {
        // Password reset email sent!
        alert("Vi har sendt deg en e-post med instruksjoner for å endre passordet ditt. Sjekk søppelpost dersom du ikke finner den i innboksen.");
      })
      .catch((error) => {
        displayFirebaseError(error);
      });
  };

  const displayFirebaseError = (error: any) => {
    if (error.code === "auth/invalid-email") {
      setDisplayErrorMessage("Vi fant ingen bruker med denne e-postadressen.");
    } else if (error.code === "auth/wrong-password") {
      setDisplayErrorMessage("Det var visst feil passord.");
    } else {
      setDisplayErrorMessage(error.message);
    }
    emptyErrorMessageOnDelay(5000);
  };

  const emptyErrorMessageOnDelay = (delay: number) => {
    setTimeout(() => {
      setDisplayErrorMessage("");
    }, delay);
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
          <p id={styles.errorMessage}>{displayErrorMessage}</p>
          <button type="submit" className={buttonStyles.mainButton}>
            Logg inn
          </button>
          <button type="button" id={styles.forgottenPassword} className={buttonStyles.smallTextButton} onClick={forgottenPassword}>
            Glemt passord?
          </button>
          <Link to="/register">Har du ingen bruker? Trykk her for å opprette en</Link>
        </form>
      </div>
    </div>
  );
};

export default SignInPage;
