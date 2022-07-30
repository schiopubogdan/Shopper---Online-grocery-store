import axios from "axios";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
} from "firebase/auth";
import React, { useContext, useState, useEffect } from "react";
import { auth } from "./firebase-config";
import { useNavigate } from "react-router-dom";
const AuthContex = React.createContext();

export function useAuth() {
  return useContext(AuthContex);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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
  async function login(email, password) {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      console.log(user);
      const userJSON = JSON.stringify(user);
      var json = JSON.parse(userJSON);
      let id = json.user.uid;
      //call de axios cu getUserRole by id
      axios
        .get("http://localhost:8080/api/user/get", { params: { id: id } })
        .then((res) => {
          if (res.data !== "") {
            console.log(res.data);
            let role = res.data.role;
            if (role === "client") {
              localStorage.setItem("role", "client");
              navigate("/home");
            }
            if (role === "admin") {
              localStorage.setItem("role", "admin");
              navigate("/homeadmin");
            }
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error.message);
    }
  }

  async function logout() {
    localStorage.clear();
    await signOut(auth);
    navigate("/login");
  }

  async function resetPassword(email) {
    await sendPasswordResetEmail(email);
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
    login,
    logout,
    resetPassword,
  };
  return (
    <AuthContex.Provider value={value}>
      {!loading && children}
    </AuthContex.Provider>
  );
}
