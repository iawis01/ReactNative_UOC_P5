// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCZHN_swV2qihOs3MCajGVLss7bNW3uTHE",
  authDomain: "pop-reactnative-reactivados.firebaseapp.com",
  projectId: "pop-reactnative-reactivados",
  storageBucket: "pop-reactnative-reactivados.appspot.com",
  messagingSenderId: "1943975684",
  appId: "1:1943975684:web:fb7787c756b2a41e744251"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);