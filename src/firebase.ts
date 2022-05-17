import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
// Config
const config = {
  apiKey: 'AIzaSyAc-iSt4M3apMcHEPqxU_whRsmnAQIhMcc',
  authDomain: 'taptaponme.firebaseapp.com',
  projectId: 'taptaponme',
  storageBucket: 'taptaponme.appspot.com',
  messagingSenderId: '1080367144581',
  appId: '1:1080367144581:web:f25d6f878a8bfdfde413ec',
  measurementId: 'G-7HRCBQH893',
};

const firebaseApp = firebase.initializeApp(config);
const fireStore = firebaseApp.firestore();
const fireAuth = firebase.auth();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
export { firebaseApp, fireStore, fireAuth, googleAuthProvider };

