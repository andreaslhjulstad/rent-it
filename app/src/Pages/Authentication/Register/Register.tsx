import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { LocalData } from "../../../Data/LocalData";

export const RegisterPage = () => {
  let name = "";
  let email = "";
  let password = "";

  function registerUser() {
    const auth = getAuth();
    console.log("Creating user..." + name + " " + email + " " + password);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        console.log(userCredential.user.uid);
        LocalData.users
          .createNewDocument(userCredential.user.uid, {
            name: name,
            email: email,
          })
          .then(() => {
            alert("Suksess");
          })
          .catch((error) => {
            alert(error.message);
          });
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
        // ..
      });
  }

  return (
    <div>
      <h1>Opprett ny bruker</h1>
      <label htmlFor="name">Ditt navn</label>
      <input type="text" id="name" placeholder="Fyll inn navnet ditt" onChange={(e) => (name = e.target.value)} />
      <label htmlFor="email">Din e-postadresse</label>
      <input type="text" id="email" placeholder="Fyll inn e-postadressen din" onChange={(e) => (email = e.target.value)} />
      <label htmlFor="password">Ditt passord</label>
      <input type="password" id="password" placeholder="Fyll inn passordet ditt" onChange={(e) => (password = e.target.value)} />
      <button onClick={() => registerUser()}>Opprett bruker</button>
    </div>
  );
};

export default RegisterPage;
