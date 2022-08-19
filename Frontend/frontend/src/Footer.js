import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

export default function Footer() {
  return (
    <div className="footer-container">
      <section className="footer-subscription">
        <p className="footer-subscription-heading">JOIN OUR NEWSLETTER</p>
        <div className="input-areas">
          <form>
            <input
              type="email"
              name="email"
              placeholder="Your email"
              className="footer-input"
            />
            <button className="footer-button" buttonStyle="btn--outline">
              Subscribe
            </button>
          </form>
        </div>
      </section>
      <div className="footer-links">
        <div className="footer-link-wrapper">
          <div className="footer-link-items">
            <h2>ORDERS </h2>
            <Link className="link" to="#">
              HOW I ORDER
            </Link>
            <Link className="link" to="#">
              HOW I PAY
            </Link>
            <Link className="link" to="#">
              HOW I USE COUPONS
            </Link>
          </div>
        </div>
        <div className="footer-link-wrapper">
          <div className="footer-link-items">
            <h2>ABOUT US</h2>
            <Link className="link" to="#">
              WHO WE ARE
            </Link>
            <Link className="link" to="#">
              OUR VISION
            </Link>
            <Link className="link" to="#">
              CAREERS
            </Link>
          </div>
        </div>
        <div className="footer-link-wrapper">
          <div className="footer-link-items">
            <h2>CLIENT</h2>
            <Link className="link" to="#">
              CONTACT US
            </Link>
            <Link className="link" to="#">
              FAQ
            </Link>
            <Link className="link" to="#">
              OTHERS
            </Link>
          </div>
        </div>
        <div className="footer-link-wrapper">
          <div className="footer-link-items">
            <h2>HELP</h2>
            <Link className="link" to="#">
              CUSTOMER SERVICE
            </Link>
            <Link className="link" to="#">
              LEGAL AND PRIVACY
            </Link>
            <Link className="link" to="#">
              PRIVACY RIGHTS
            </Link>
            <Link className="link" to="#">
              COOKIE SETTINGS
            </Link>
          </div>
        </div>
      </div>
      <section className="social-media">
        <div className="social-media-wrap">
          <div className="social-icons">
            <Link
              to="#"
              className="social-icon-link facebook"
              aria-label="Facebook"
            >
              <i class="fa fa-facebook" aria-hidden="true"></i>
            </Link>
            <Link
              to="#"
              className="social-icon-link instagram"
              aria-label="Instagram"
            >
              <i class="fa fa-instagram" aria-hidden="true"></i>
            </Link>
            <Link
              to="#"
              className="social-icon-link youtube"
              aria-label="Youtube"
            >
              <i class="fa fa-youtube" aria-hidden="true"></i>
            </Link>
            <Link
              to="#"
              className="social-icon-link twitter"
              aria-label="Twitter"
            >
              <i class="fa fa-twitter" aria-hidden="true"></i>
            </Link>
            <Link
              to="#"
              className="social-icon-link linkedin"
              aria-label="LinkedIn"
            >
              <i class="fa fa-linkedin" aria-hidden="true"></i>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
