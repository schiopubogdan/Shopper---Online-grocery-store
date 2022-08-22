import { Container } from "react-bootstrap";
import LoginForm from "./LoginForm";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "./App.css";
function LoginPage() {
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
              <LoginForm />
            </div>
          </Container>
        </div>
      </div>
      <Footer />
    </div>
  );
}
export default LoginPage;
