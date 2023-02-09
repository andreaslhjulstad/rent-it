import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignInPage from "./Pages/Authentication/SignIn/SignIn";
import RegisterPage from "./Pages/Authentication/Register/Register";

// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAdvWFVFTikj7-DewtKjoms8TJfByKEmPE",
  authDomain: "tdt4140-rentit.firebaseapp.com",
  projectId: "tdt4140-rentit",
  storageBucket: "tdt4140-rentit.appspot.com",
  messagingSenderId: "1075872803529",
  appId: "1:1075872803529:web:e33ea025b274ca5938fb18",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signIn" element={<SignInPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
