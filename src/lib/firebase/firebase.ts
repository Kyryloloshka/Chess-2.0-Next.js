import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: "chess-59a37.firebaseapp.com",
  databaseURL: "https://chess-59a37-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "chess-59a37",
  storageBucket: "chess-59a37.appspot.com",
  messagingSenderId: "129268031996",
  appId: "1:129268031996:web:c2c9a02254e1b42ab2d279"
};

export const app = initializeApp(firebaseConfig);
export const googleAuthProvider = new GoogleAuthProvider();
export const auth = getAuth(app)