
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyDefhNPQrK81d20BbUWTXL-CtWQKbH-kYw",
  authDomain: "hw-01-react-native-v2.firebaseapp.com",
  projectId: "hw-01-react-native-v2",
  storageBucket: "hw-01-react-native-v2.appspot.com",
  messagingSenderId: "565203500485",
  appId: "1:565203500485:web:8bd20c0e264950e2d59fac",
  measurementId: "G-8PLW2MJDN0"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

