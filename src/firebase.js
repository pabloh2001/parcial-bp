import firebase from "firebase";
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCjBO7RE__rWQT0wvDZTS3so2yDtwRo6_0",
  authDomain: "parcial-bp.firebaseapp.com",
  projectId: "parcial-bp",
  storageBucket: "parcial-bp.appspot.com",
  messagingSenderId: "705316491288",
  appId: "1:705316491288:web:de627a16a05ff6ac03336d"
};

firebase.initializeApp(firebaseConfig);
export{firebase}