import { Container } from "react-bootstrap";
import LoginForm from "./LoginForm";

function LoginPage() {
  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <LoginForm />
      </div>
    </Container>
  );
}
export default LoginPage;
