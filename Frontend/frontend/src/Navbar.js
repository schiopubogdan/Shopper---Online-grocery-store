import React, { useState, useEffect } from "react";
import { useAuth } from "./AuthContex";
import { Button } from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import "./Card.css";

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
                          Alcohol
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          Beauty
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          Beverage
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          Canned
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          Dairy
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          Fruits
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          Household
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          Meat
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          Others
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          Pantry
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          Snacks
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          Sweets
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          Vegetables
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
                    <a
                      className="nav-link active"
                      aria-current="page"
                      href="/favorites"
                    >
                      Favorites{" "}
                      <i className="fa fa-heart" aria-hidden="true"></i>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link active"
                      aria-current="page"
                      href="/shopping"
                    >
                      Shopping cart{" "}
                      <i className="fa fa-shopping-cart" aria-hidden="true"></i>
                    </a>
                  </li>
                </ul>
                <Button
                  className="cart-button rounded-circle"
                  variant="outline-primary"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path d="M10 19.5c0 .829-.672 1.5-1.5 1.5s-1.5-.671-1.5-1.5c0-.828.672-1.5 1.5-1.5s1.5.672 1.5 1.5zm3.5-1.5c-.828 0-1.5.671-1.5 1.5s.672 1.5 1.5 1.5 1.5-.671 1.5-1.5c0-.828-.672-1.5-1.5-1.5zm1.336-5l1.977-7h-16.813l2.938 7h11.898zm4.969-10l-3.432 12h-12.597l.839 2h13.239l3.474-12h1.929l.743-2h-4.195z" />
                  </svg>
                </Button>
                <DropdownButton
                  key={direction}
                  id={`dropdown-button-drop-${direction}`}
                  drop={direction}
                  variant="primary"
                  title="Profile"
                >
                  <Dropdown.Item eventKey="1">My profile</Dropdown.Item>
                  <Dropdown.Item eventKey="2">My orders</Dropdown.Item>
                  <Dropdown.Item eventKey="3">My coupons</Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item eventKey="4" onClick={handleLogout}>
                    Log out
                  </Dropdown.Item>
                </DropdownButton>
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
                          Alcohol
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          Beauty
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          Beverage
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          Canned
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          Dairy
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          Fruits
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          Household
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          Meat
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          Others
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          Pantry
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          Snacks
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          Sweets
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          Vegetables
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
