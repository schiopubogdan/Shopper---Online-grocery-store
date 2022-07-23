import React from "react";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase-config";
import { Form, Button, Card } from "react-bootstrap";

function RegisterForm() {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState("");

  const register = async () => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
      // axios post pentru creare UserRole cu id-ul user si email
      console.log(user);
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Sign up</h2>
          <Form>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                onChange={(event) => {
                  setRegisterEmail(event.target.value);
                }}
                required
              />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                onChange={(event) => {
                  setRegisterPassword(event.target.value);
                }}
                required
              />
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Label>Password confirmation</Form.Label>
              <Form.Control
                type="password"
                onChange={(event) => {
                  setRegisterConfirmPassword(event.target.value);
                }}
                required
              />
            </Form.Group>
            <br></br>
            <Button className="w-100" type="submit" onClick={register}>
              Sign up
            </Button>
          </Form>
        </Card.Body>
        <div className="w-100 text-center mt-2">Already have an account?</div>
      </Card>
    </>
  );
}
export default RegisterForm;
