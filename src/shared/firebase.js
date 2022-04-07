import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyARmj_yE3XdKSCcg-Trf9pUYLkVOXBwoa0",
  authDomain: "sparta-react-basic-975fe.firebaseapp.com",
  projectId: "sparta-react-basic-975fe",
  storageBucket: "sparta-react-basic-975fe.appspot.com",
  messagingSenderId: "47157098212",
  appId: "1:47157098212:web:7381e6753ec0dc17ffdef1",
  measurementId: "G-VZZRTDFB25",
};

firebase.initializeApp(firebaseConfig);
const apiKey = firebaseConfig.apiKey;
const auth = firebase.auth();
const firestore = firebase.firestore();
const storage = firebase.storage();
export { auth, apiKey, firestore, storage };
