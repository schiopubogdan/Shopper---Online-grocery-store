import React, { useState } from "react";
import { useAuth } from "./AuthContex";
import { Button } from "react-bootstrap";

export default function AdminNavbar() {
  const { logout } = useAuth();
  const [error, setError] = useState("");
  async function handleLogout() {
    setError("");
    try {
      await logout();
    } catch {
      setError("Failed to log out");
    }
  }
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-light">
        <div className="container-fluid">
          <a className="navbar-brand fw-bold fs-4" href="">
            NUME SITE
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a
                  className="nav-link active"
                  aria-current="page"
                  href="/admin-prod-man"
                >
                  PRODUCT MANAGEMENT
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link active"
                  aria-current="page"
                  href="/admin-empl-man"
                >
                  EMPLOYEE MANAGEMENT
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/worker-ready">
                  ANALYTICS
                </a>
              </li>
            </ul>
            <Button
              className="cart-button rounded-circle"
              variant="outline-primary"
              onClick={handleLogout}
            >
              LOG OUT
            </Button>
          </div>
        </div>
      </nav>
    </div>
  );
}
