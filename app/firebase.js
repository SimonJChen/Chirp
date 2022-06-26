// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCff034WJvhW5hnWTuO8SuUUaH8sk5lGJA",
  authDomain: "chirp-b7cf0.firebaseapp.com",
  projectId: "chirp-b7cf0",
  storageBucket: "chirp-b7cf0.appspot.com",
  messagingSenderId: "50724839721",
  appId: "1:50724839721:web:e04702dabb2956de471738",
  measurementId: "G-TYQMVV2DGP",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
