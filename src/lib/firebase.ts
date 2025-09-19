// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  projectId: "studio-9847644347-c9627",
  appId: "1:111256360498:web:ba6c5c812207facc860e2b",
  apiKey: "AIzaSyCsS_8EWWWSnlU66CKt5YSCSmsXcPcDiFg",
  authDomain: "studio-9847644347-c9627.firebaseapp.com",
  measurementId: "",
  messagingSenderId: "111256360498"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
