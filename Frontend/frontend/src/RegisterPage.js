import React from "react";
import RegisterForm from "./RegisterForm";
import { Container } from "react-bootstrap";
import Navbar from "./Navbar";

function RegisterPage() {
  return (
    <div>
      <Navbar />
      <div className="page">
        <div className="page-grid">
          <Container
            className="d-flex align-items-center justify-content-center"
            style={{ minHeight: "100vh" }}
          >
            <div className="w-100" style={{ maxWidth: "400px" }}>
              <RegisterForm />
            </div>
          </Container>
        </div>
      </div>
    </div>
  );
}
export default RegisterPage;
