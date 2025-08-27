// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"; // <-- add this

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAYqRaQ6wyAw1kP3wwLgDG64lQe3kv2gS0",
  authDomain: "portfolio-a0880.firebaseapp.com",
  projectId: "portfolio-a0880",
  storageBucket: "portfolio-a0880.firebasestorage.app",
  messagingSenderId: "405099582864",
  appId: "1:405099582864:web:56cf5c2c4cac6da8018f15",
  measurementId: "G-3YPCCZBKLJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firestore
const db = getFirestore(app); // <-- Firestore instance

// Export db so other files can use it
export { db };
