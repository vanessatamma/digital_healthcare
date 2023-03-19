import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAaC1bhLtE8MRgWzxZ6yZ61BD0mo-yo-k4",
    authDomain: "digital-healthcare-vanessa.firebaseapp.com",
    projectId: "digital-healthcare-vanessa",
    storageBucket: "digital-healthcare-vanessa.appspot.com",
    messagingSenderId: "110884474902",
    appId: "1:110884474902:web:537c068fc747527f7da537"
};

export const initFirebase = () => { initializeApp(firebaseConfig) }


// init firestore service
//export const db = getFirestore();
