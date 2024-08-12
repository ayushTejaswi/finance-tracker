// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBlzB18WjTs5qVXtNuXcblfL82_uk50-MI",
  authDomain: "finance-app-bd894.firebaseapp.com",
  projectId: "finance-app-bd894",
  storageBucket: "finance-app-bd894.appspot.com",
  messagingSenderId: "52407376590",
  appId: "1:52407376590:web:4b2fceac6ff3dfcb2d8e9f",
  measurementId: "G-R6B89P272Q",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
//we store a copy of auth,db,provider in firebase and use it everywhere
const provider = new GoogleAuthProvider();

export { db, auth, provider, doc, setDoc };
