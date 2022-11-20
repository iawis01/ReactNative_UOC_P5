// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
import { getFirestore } from 'firebase/firestore';
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyDdhV5g8HEQLHhcBBhrgX3iJ9bBVME2NfQ',
	authDomain: 'rn-uoc.firebaseapp.com',
	databaseURL: 'https://rn-uoc-default-rtdb.europe-west1.firebasedatabase.app',
	projectId: 'rn-uoc',
	storageBucket: 'rn-uoc.appspot.com',
	messagingSenderId: '296773433761',
	appId: '1:296773433761:web:c9cf0e3bc2348dd61e73e0',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db };
