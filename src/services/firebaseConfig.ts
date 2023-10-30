// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyCUm-70YmUk6G39C8NtlO2pg92eyAjOQgY",
  authDomain: "teste-taugor-b04ed.firebaseapp.com",
  projectId: "teste-taugor-b04ed",
  storageBucket: "teste-taugor-b04ed.appspot.com",
  messagingSenderId: "242463795310",
  appId: "1:242463795310:web:453dda85fb0cac1e709e7f",
  measurementId: "G-5NP6Q1VVLC"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const auth = getAuth(app);
