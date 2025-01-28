// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBoUuTGVQtzftSD0m_dpoDeDLc33_5KUz0",
  authDomain: "notes-app-7e13c.firebaseapp.com",
  projectId: "notes-app-7e13c",
  storageBucket: "notes-app-7e13c.firebasestorage.app",
  messagingSenderId: "96443279263",
  appId: "1:96443279263:web:73c6616cbd8a0af0bebfaa",
  measurementId: "G-0MNV3CTL78",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const firestore = getFirestore(app);

export { analytics, auth, firestore };
