import React from "react";

export default function Navbar() {
  return (
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
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/home">
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
                  Favorites <i className="fa fa-heart" aria-hidden="true"></i>
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
  );
}
