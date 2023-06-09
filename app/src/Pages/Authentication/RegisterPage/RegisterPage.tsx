import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { SetStateAction, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LocalData } from "../../../Data/LocalData";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import styles from "./RegisterPage.module.css";
import buttonStyles from "../../../GlobalStyling/Buttons.module.css";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../App";

export const RegisterPage = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState<File>();
  const [displayErrorMessage, setDisplayErrorMessage] = useState("");
  const [submitDisabled, setSubmitDisabled] = useState(false);

  const registerUser = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitDisabled(true);
    const auth = getAuth();
    if (name === "") {
      setDisplayErrorMessage("Du må fylle inn navnet ditt");
      setSubmitDisabled(false);
      return;
    } else if (email === "") {
      setDisplayErrorMessage("Du må fylle inn e-postadressen din");
      setSubmitDisabled(false);
      return;
    } else if (phoneNumber === "") {
      setDisplayErrorMessage("Du må fylle inn telefon-nummeret ditt");
      setSubmitDisabled(false);
      return;
    } else if (password === "") {
      setDisplayErrorMessage("Du må fylle inn passordet ditt");
      setSubmitDisabled(false);
      return;
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        LocalData.users
          .createNewDocument(userCredential.user.uid, {
            name: name,
            phoneNumber: phoneNumber,
            email: email,
            favorites: [],
          })
          .then((userRef) => {
            if(image) {
              const path = `images/users/${userCredential.user.uid}/${image.name}`;
              const storageRef = ref(getStorage(), path);
              uploadBytes(storageRef, image)

              const userRef = doc(db, "users", userCredential.user.uid);
              updateDoc(userRef, { imagePath: path }).then(() => {
                alert("Brukeren ble opprettet!")
                navigate("/");
              });
            }else{
              alert("Brukeren ble opprettet!")
              navigate("/");
            }
          })
          .catch((error: { message: SetStateAction<string> }) => {
            setDisplayErrorMessage(error.message);
            emptyErrorMessageOnDelay(5000);
          });
      })
      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          setDisplayErrorMessage("Det finnes allerede en bruker med denne e-postadressen.");
        } else {
          setDisplayErrorMessage(error.message);
        }
        setSubmitDisabled(false);
        emptyErrorMessageOnDelay(5000);
      });
  };

  const emptyErrorMessageOnDelay = (delay: number) => {
    setTimeout(() => {
      setDisplayErrorMessage("");
    }, delay);
  };

  return (
    <div id={styles.registerPage}>
      <div id="registerContent" className={styles.registerContent}>
        <h1>Opprett ny bruker</h1>
        <form className={styles.registerForm} onSubmit={registerUser}>
          <label htmlFor="name">Ditt navn</label>
          <input type="text" id="name" placeholder="Fyll inn navnet ditt" onChange={(e) => setName(e.target.value)} />
          <label htmlFor="image">
            Legg til et profilbilde
          </label>
          <input
            type="file"
            id="image"
            accept="image/png, image/jpeg"
            onChange={(e) => {
              setImage(Array.from(e.target.files ?? [])[0]);
            }}
          />
          <label htmlFor="email">Din e-postadresse</label>
          <input type="text" id="email" placeholder="Fyll inn e-postadressen din" onChange={(e) => setEmail(e.target.value)} />
          <label htmlFor="phoneNumber">Telefon-nummeret ditt</label>
          <input type="text" id="phoneNumber" placeholder="Fyll inn telefon-nummeret ditt" onChange={(e) => setPhoneNumber(e.target.value)} />
          <label htmlFor="password">Ditt passord</label>
          <input type="password" id="password" placeholder="Fyll inn passordet ditt" onChange={(e) => setPassword(e.target.value)} />
          <p id={styles.errorMessage}>{displayErrorMessage}</p>
          <button type="submit" disabled={submitDisabled} className={buttonStyles.mainButton}>
            Opprett bruker
          </button>
          <Link to="/signIn">Har du allerede en bruker? Logg inn her</Link>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
