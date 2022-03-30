import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// asia-northeast1 Tokyo
// asia-northeast2 Osaka
// asia-northeast3 Seoul

const firebaseConfig = {
  apiKey: "AIzaSyC18pEbkDOQIcomQ3NxHNxjp3295oqOmYg",
  authDomain: "sikggu-sikggu.firebaseapp.com",
  projectId: "sikggu-sikggu",
  storageBucket: "sikggu-sikggu.appspot.com",
  messagingSenderId: "591628525503",
  appId: "1:591628525503:web:31b9ab5e1a5438c88e8b0a",
  measurementId: "G-27W0FBFVDJ",
};

const app = initializeApp(firebaseConfig);
export const authService = getAuth();
export const dbService = getFirestore();
