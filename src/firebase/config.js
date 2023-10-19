// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCc66XH9HYpvSpVsTWSkUYWcf82IYOJhrA",
    authDomain: "proactive-5cb2e.firebaseapp.com",
    projectId: "proactive-5cb2e",
    storageBucket: "proactive-5cb2e.appspot.com",
    messagingSenderId: "426350891272",
    appId: "1:426350891272:web:3001e694fc400e3bb21cbd"
};

// Initialize Firebase
export const App = initializeApp( firebaseConfig );
export const FirebaseAuth = getAuth( App );
export const FirebaseDB = getFirestore( App );