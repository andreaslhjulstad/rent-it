/* eslint-disable react/jsx-no-comment-textnodes */
import "./App.css";
import { BrowserRouter, Navigate, Outlet, Route, Routes, useLocation } from "react-router-dom";
import SignInPage from "./Pages/Authentication/SignInPage/SignInPage";
import RegisterPage from "./Pages/Authentication/RegisterPage/RegisterPage";
import "./GlobalStyling/main.css";

// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { useState } from "react";
import HomePage from "./Pages/HomePage/HomePage";
import CreateAdPage from "./Pages/CreateAdPage/CreateAdPage";
import { getAuth } from "firebase/auth";
import AdPage from "./Pages/ViewAdPage/AdPage";
import UserPage from "./Pages/ViewUserPage/UserPage";
import AdsPage from "./Pages/AdsPage/AdsPage";

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
          <Route path="/createAd" element={<CreateAdPage />} />
          <Route path="/AdPage" element={<AdPage />} />
          <Route path="/AdsPage" element={<AdsPage />} />
          <Route path="/UserPage" element={<UserPage />} />
        </Route>
        <Route path="/signIn" element={<SignInPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;

const RequireAuth = () => {
  const [page, setPage] = useState(<Outlet />);
  let location = useLocation();
  getAuth().onAuthStateChanged((user) => {
    if (!user || !user.email) {
      setPage(<Navigate to="/signIn" state={{ from: location }} />);
    }
  });
  return page;
};
