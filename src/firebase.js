import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyANH-LDX-NfFLiKPdo60E9H6aLIK3bXaYU",
  authDomain: "linkedin-clone-8ffc3.firebaseapp.com",
  projectId: "linkedin-clone-8ffc3",
  storageBucket: "linkedin-clone-8ffc3.appspot.com",
  messagingSenderId: "744723754238",
  appId: "1:744723754238:web:68a399223b52ee972149af",
  measurementId: "G-7KPB2VQ23K",
};

const app = firebase.initializeApp(firebaseConfig);

const db = app.firestore();
const auth = app.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage();

export { auth, provider, storage };
export default db;
