import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBY5ClrUFZr6nVl_cedsJGKVgEMId7ghmw",
  authDomain: "messenger-clone-f1b61.firebaseapp.com",
  projectId: "messenger-clone-f1b61",
  storageBucket: "messenger-clone-f1b61.appspot.com",
  messagingSenderId: "557177951814",
  appId: "1:557177951814:web:e505da43e8bcfa5a359c47",
  measurementId: "G-QDPXSLJYD4",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();

export default db;
