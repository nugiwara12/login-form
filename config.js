import { initializeApp } from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCiKHmFy3x098UB_NhXhqrn9E5oRsc2skQ",
  authDomain: "website-5023a.firebaseapp.com",
  projectId: "website-5023a",
  storageBucket: "website-5023a.appspot.com",
  messagingSenderId: "773663494202",
  appId: "1:773663494202:web:8180d4c3f42284f6e2e503",
  measurementId: "G-NVLM6L4Y2Z",
};

const app = initializeApp(firebaseConfig);

export default app;
