import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDbAprQFqQwk6Bdoc8AblHBvwhsiF4f7KE",
    authDomain: "licentav3-dd9db.firebaseapp.com",
    projectId: "licentav3-dd9db",
    storageBucket: "licentav3-dd9db.appspot.com",
    messagingSenderId: "872500156627",
    appId: "1:872500156627:web:3668c46fc8f4603694dc26",
    measurementId: "G-82CEBSLPBX"
  };

  //initialize the connection between Firebase and my project
  const app = initializeApp(firebaseConfig);
  export const auth = getAuth(app);