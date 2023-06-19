import React from "react";
import ReactDOM from "react-dom/client";
import App from "./Components/App";
// import App from "./Components/App.js";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./Components/LoginPage";
import CreateAccountPage from "./Components/CreateAccount";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAqbM7iVbqJatAmBiRlxqVwdUE0VFYK9TU",
  authDomain: "glossy-handler-237816.firebaseapp.com",
  projectId: "glossy-handler-237816",
  storageBucket: "glossy-handler-237816.appspot.com",
  messagingSenderId: "317716339266",
  appId: "1:317716339266:web:53e294d9b158269bf6abdb",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/create-account" element={<CreateAccountPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
