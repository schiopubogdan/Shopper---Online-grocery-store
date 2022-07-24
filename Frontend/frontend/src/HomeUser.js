import React, { useState } from "react";
import { useAuth } from "./AuthContex";
import { Button, Alert } from "react-bootstrap";

function HomeUser() {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();

  async function handleLogout() {
    setError("");
    try {
      await logout();
    } catch {
      setError("Failed to log out");
    }
  }
  return (
    <>
      {error && <Alert variant="danger">{error}</Alert>}
      <strong>Email:</strong>
      {currentUser.email}
      <br></br>
      <Button variant="link" onClick={handleLogout}>
        Log out
      </Button>
    </>
  );
}
export default HomeUser;
