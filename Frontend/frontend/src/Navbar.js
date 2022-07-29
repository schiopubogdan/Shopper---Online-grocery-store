import React, { useState, useEffect } from "react";
import { useAuth } from "./AuthContex";

import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import SplitButton from "react-bootstrap/SplitButton";

export default function Navbar() {
  const direction = "start";
  const [error, setError] = useState("");
  const { logout } = useAuth();
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
      {localStorage.getItem("role") === "client" ? (
        <div>
          <nav className="navbar navbar-expand-lg bg-light">
            <div className="container-fluid">
              <a className="navbar-brand fw-bold fs-4" href="#">
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
              <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent"
              >
                <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <a
                      className="nav-link active"
                      aria-current="page"
                      href="/home"
                    >
                      Home
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link active"
                      aria-current="page"
                      href="/products"
                    >
                      Products
                    </a>
                  </li>
                  <li className="nav-item dropdown">
                    <a
                      className="nav-link dropdown-toggle"
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Categories
                    </a>
                    <ul className="dropdown-menu">
                      <li>
                        <a className="dropdown-item" href="#">
                          First category
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          Second category
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          Third category
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/deals">
                      Today's deal
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link active" aria-current="page" href="#">
                      Favorites{" "}
                      <i className="fa fa-heart" aria-hidden="true"></i>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link active" aria-current="page" href="#">
                      Shopping cart{" "}
                      <i className="fa fa-shopping-cart" aria-hidden="true"></i>
                    </a>
                  </li>
                </ul>
                {/* <div className="btn-group dropleft">
                  <button
                    className="btn dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                  >
                    Profile
                  </button>
                  <div className="dropdown-menu">
                    <a className="dropdown-item" href="#">
                      My profile
                    </a>

                    <a className="dropdown-item" href="#">
                      My orders
                    </a>

                    <a className="dropdown-item" href="#">
                      My coupons
                    </a>

                    <Button variant="link" onClick={handleLogout}>
                      Log out
                    </Button>
                  </div>
                </div> */}
                <DropdownButton
                  key={direction}
                  id={`dropdown-button-drop-${direction}`}
                  drop={direction}
                  variant="secondary"
                  title={` Drop ${direction} `}
                >
                  <Dropdown.Item eventKey="1">Action</Dropdown.Item>
                  <Dropdown.Item eventKey="2">Another action</Dropdown.Item>
                  <Dropdown.Item eventKey="3">
                    Something else here
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item eventKey="4">Separated link</Dropdown.Item>
                </DropdownButton>

                {/* <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Profile
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <a className="dropdown-item" href="#">
                      My profile
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      My orders
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      My coupons
                    </a>
                  </li>
                  <li>
                    <Button variant="link" onClick={handleLogout}>
                      Log out
                    </Button>
                  </li>
                </ul> */}
              </div>
            </div>
          </nav>
        </div>
      ) : (
        <div>
          <nav className="navbar navbar-expand-lg bg-light">
            <div className="container-fluid">
              <a className="navbar-brand fw-bold fs-4" href="#">
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
              <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent"
              >
                <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <a
                      className="nav-link active"
                      aria-current="page"
                      href="/home"
                    >
                      Home
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link active"
                      aria-current="page"
                      href="/products"
                    >
                      Products
                    </a>
                  </li>
                  <li className="nav-item dropdown">
                    <a
                      className="nav-link dropdown-toggle"
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Categories
                    </a>
                    <ul className="dropdown-menu">
                      <li>
                        <a className="dropdown-item" href="#">
                          First category
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          Second category
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          Third category
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/deals">
                      Today's deal
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link disabled">
                      Favorites{" "}
                      <i className="fa fa-heart" aria-hidden="true"></i>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link disabled">
                      Shopping cart{" "}
                      <i className="fa fa-shopping-cart" aria-hidden="true"></i>
                    </a>
                  </li>
                </ul>
                <div className="buttons">
                  <a href="/login" className="btn btn-outline-primary ms-2">
                    <i className="fa fa-sign-in me-1"></i>
                    Login
                  </a>
                  <a href="/register" className="btn btn-outline-primary ms-2">
                    <i className="fa fa-user-plus me-1" aria-hidden="true"></i>
                    Register
                  </a>
                </div>
              </div>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
