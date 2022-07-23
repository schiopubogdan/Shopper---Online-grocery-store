import React from "react";
import RegisterForm from "./RegisterForm";
import { Container } from "react-bootstrap";

function RegisterPage() {
  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <RegisterForm />
      </div>
    </Container>
  );
}
export default RegisterPage;
