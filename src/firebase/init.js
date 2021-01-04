import firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/auth'


const firebaseConfig = {
    // apiKey: process.env.VUE_APP_FIREBASE_apiKey, 
    // authDomain: process.env.VUE_APP_FIREBASE_authDomain,
    // projectId: process.env.VUE_APP_FIREBASE_projectId,
    // storageBucket: process.env.VUE_APP_FIREBASE_storageBucket,
    // messagingSenderId: process.env.VUE_APP_FIREBASE_messagingSenderId,
    // appId: process.env.VUE_APP_FIREBASE_appId
    apiKey: "AIzaSyBLBq7w7OfjQ82pztRNODqXqJ_ekbiK94k",
    authDomain: "awalna-76bf8.firebaseapp.com",
    projectId: "awalna-76bf8",
    storageBucket: "awalna-76bf8.appspot.com",
    messagingSenderId: "581813805924",
    appId: "1:581813805924:web:7d3eb345283275fce75071"
  };
//var provider = new firebase.auth.GoogleAuthProvider();

//const auth = firebase.auth()
const firebaseapp = firebase.initializeApp(firebaseConfig);
const db = firebaseapp.firestore();
export default db   ;