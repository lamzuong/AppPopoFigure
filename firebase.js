// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

import Constants from "expo-constants";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDYDBVg7wMxPq8KtoUlFovIV54lb75qQfk",
  authDomain: "apppopofigure.firebaseapp.com",
  projectId: "apppopofigure",
  storageBucket: "apppopofigure.appspot.com",
  messagingSenderId: "439657704800",
  appId: "1:439657704800:web:79fe2d321b9cb12a8dc205",
  measurementId: "G-GW3K9BG351",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
