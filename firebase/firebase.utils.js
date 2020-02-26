import firebase from 'firebase/firebase-app'
import 'firebase/firebase-firestore'
import 'firebase/firebase-auth'
 
  const firebaseConfig = {
  apiKey: "AIzaSyDI53lx0xAPoCOsRSjO2Q_CRGk2Jm0kXiM",
  authDomain: "api-hot-brew.firebaseapp.com",
  databaseURL: "https://api-hot-brew.firebaseio.com",
  projectId: "api-hot-brew",
  storageBucket: "api-hot-brew.appspot.com",
  messagingSenderId: "1090628766284",
  appId: "1:1090628766284:web:32d3dff705b9a5ff80c2e9",
  measurementId: "G-4VXFBV4GY7"
  };
 
firebase.initializeApp(firebaseConfig);
  
export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;