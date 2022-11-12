import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAbNKCh01Mo9951CPcnBwSqx00d0iFDdk4",
  authDomain: "firecontact-5266a.firebaseapp.com",
  databaseURL:
    "https://firecontact-5266a-default-rtdb.europe-west1.firebasedatabase.app/",
  projectId: "firecontact-5266a",
  storageBucket: "firecontact-5266a.appspot.com",
  messagingSenderId: "722321210003",
  appId: "1:722321210003:web:5a7b052ce086e4a24dab66",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);
