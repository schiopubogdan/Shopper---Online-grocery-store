import React, { useRef } from "react";
import { useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "./AuthContex";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";
import Navbar from "./Navbar";
import "./App.css";
import "./Card.css";

export default function ForgotPassword() {
  const emailRef = useRef();

  const { resetPassword } = useAuth();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setMessage("");
      setError("");
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setMessage("Password reset email sent. Check your inbox");
    } catch {
      setError("Failed to reset password");
    }
    setLoading(false);
  }
  return (
    <>
      <Navbar />
      <div className="page">
        <div className="page-grid">
          <Container
            className="d-flex align-items-center justify-content-center"
            style={{ minHeight: "100vh" }}
          >
            <Card>
              <Card.Body>
                <h2 className="text-center mb-4">Reset password</h2>
                {error && <Alert variant="danger">{error}</Alert>}
                {message && <Alert variant="success">{message}</Alert>}
                <Form onSubmit={handleSubmit}>
                  <Form.Group id="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" ref={emailRef} required />
                  </Form.Group>
                  <br></br>
                  <Button className="w-100" type="submit" disabled={loading}>
                    Reset
                  </Button>
                </Form>
                <div className="w-100 text-center mt-3">
                  <Link to="/login">Back to login</Link>
                </div>
              </Card.Body>
            </Card>
          </Container>
        </div>
      </div>
    </>
  );
}
