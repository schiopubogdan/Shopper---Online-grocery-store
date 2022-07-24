import axios from "axios";
import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useContext, useState, useEffect } from "react";
import { auth } from "./firebase-config";

const AuthContex = React.createContext();

export function useAuth() {
  return useContext(AuthContex);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  async function register(email, password) {
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
      console.log(user);
      const userJSON = JSON.stringify(user);
      var json = JSON.parse(userJSON);
      // apel axios pt creare UserRole
      let item = {
        id: json.user.uid,
        email: email,
        role: "client",
      };

      axios
        .post("http://localhost:8080/api/user", item)
        .then((res) => {
          if (res.data !== "") {
            alert("Inregistrare cu succes!");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error.message);
      if (error.message === "Firebase: Error (auth/email-already-in-use).") {
        alert("Email already used. Try another one");
      }
      if (
        error.message ===
        "Firebase: Password should be at least 6 characters (auth/weak-password)."
      ) {
        alert("Password must be at least 6 characters");
      }
    }
  }
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    register,
  };
  return (
    <AuthContex.Provider value={value}>
      {!loading && children}
    </AuthContex.Provider>
  );
}
