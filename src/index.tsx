import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import { App } from "./App";
import reportWebVitals from "./reportWebVitals";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
const firebaseConfig = {
  apiKey: "AIzaSyBtUkcGvvzQhuyQB9YUqG-OcZZjqplVMkA",
  authDomain: "sofsw-web.firebaseapp.com",
  projectId: "sofsw-web",
  storageBucket: "sofsw-web.appspot.com",
  messagingSenderId: "816183681271",
  appId: "1:816183681271:web:7495a39df4066e648b73f2",
  measurementId: "G-2CGPXVC918",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
declare global {
  interface Window {
    themeStylesEl: any;
  }
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

serviceWorkerRegistration.register();
