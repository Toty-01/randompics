import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"


const firebaseConfig = {
  apiKey: "AIzaSyCNRSWiqHDqDT-Jbc95S5XePsAHhi448Tg",
  authDomain: "designer-auth-app.firebaseapp.com",
  projectId: "designer-auth-app",
  storageBucket: "designer-auth-app.appspot.com",
  messagingSenderId: "252255822235",
  appId: "1:252255822235:web:a01ae06f08ffa3cb37c13e"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);