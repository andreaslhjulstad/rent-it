import "./App.css";
import { BrowserRouter, Navigate, Outlet, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import SignInPage from "./Pages/Authentication/SignInPage/SignInPage";
import RegisterPage from "./Pages/Authentication/RegisterPage/RegisterPage";
import "./GlobalStyling/main.css";

// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import HomePage from "./Pages/Authentication/HomePage/HomePage";
import { getAuth } from "firebase/auth";

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
        <Route element={<RequireAuth />}>
          <Route path="/" element={<HomePage />} />
        </Route>
        <Route path="/signIn" element={<SignInPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;

function RequireAuth() {
  const auth = getAuth();
  let location = useLocation();

  if (!auth.currentUser) {
    return <Navigate to="/signIn" state={{ from: location }} />;
  }
  return <Outlet />;
}