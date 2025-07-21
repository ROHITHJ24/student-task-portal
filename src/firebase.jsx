// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC_ihwmzMY3vlkBiWvrC75Dr4fNE2ZmnMs",
  authDomain: "student-task-portal.firebaseapp.com",
  projectId: "student-task-portal",
  storageBucket: "student-task-portal.firebasestorage.app",
  messagingSenderId: "528508375705",
  appId: "1:528508375705:web:193a0a8de7a62197765e08",
  measurementId: "G-HP03XGS0T1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

//for login / sign up
const auth = getAuth(app); 

//for task and test,etc..
const db = getFirestore(app); 

//exporting the components
export {auth, db, analytics };