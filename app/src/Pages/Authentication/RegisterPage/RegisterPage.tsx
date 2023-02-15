import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LocalData } from "../../../Data/LocalData";

import styles from "./RegisterPage.module.css";
import buttonStyles from "../../../GlobalStyling/Buttons.module.css";

export const RegisterPage = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayErrorMessage, setDisplayErrorMessage] = useState("");
  const [submitDisabled, setSubmitDisabled] = useState(false);

  const registerUser = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitDisabled(true);
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        LocalData.users
          .createNewDocument(userCredential.user.uid, {
            name: name,
            email: email,
          })
          .then(() => {
            navigate("/");
          })
          .catch((error) => {
            alert(error.message);
          });
      })
      .catch((error) => {
        setDisplayErrorMessage(error.message);
        setSubmitDisabled(false);
      });
  };

  return (
    <div id={styles.registerPage}>
      <div className={styles.registerContent}>
        <h1>Opprett ny bruker</h1>
        <form className={styles.registerForm} onSubmit={registerUser}>
          <label htmlFor="name">Ditt navn</label>
          <input type="text" id="name" placeholder="Fyll inn navnet ditt" onChange={(e) => setName(e.target.value)} />
          <label htmlFor="email">Din e-postadresse</label>
          <input type="text" id="email" placeholder="Fyll inn e-postadressen din" onChange={(e) => setEmail(e.target.value)} />
          <label htmlFor="password">Ditt passord</label>
          <input type="password" id="password" placeholder="Fyll inn passordet ditt" onChange={(e) => setPassword(e.target.value)} />
          <p>{displayErrorMessage}</p>
          <button type="submit" disabled={submitDisabled} className={buttonStyles.mainButton}>
            Opprett bruker
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
