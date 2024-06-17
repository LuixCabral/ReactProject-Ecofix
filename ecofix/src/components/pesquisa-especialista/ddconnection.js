// src/components/DatabaseConnection.jsx

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD9WejI4Ze3a3wuUCYQs4TSiFs_iK_OV9E",
  authDomain: "ecofix-fbc99.firebaseapp.com",
  projectId: "ecofix-fbc99",
  storageBucket: "ecofix-fbc99.appspot.com",
  messagingSenderId: "441888462090",
  appId: "1:441888462090:web:155c346c9551ce250956f3",
  measurementId: "G-KQHSNY49B9"
};

// Initialize Firebase 
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
export default db;