import React from "react";
import "./Stripe/Stripe.css";
import StripeContainer from "./Stripe/StripeContainer";
import "./PaymentPage.css";
import { useLocation } from "react-router";

export default function PaymentPage() {
  const location = useLocation();
  const { price } = location.state;
  return (
    <div className="payment-page">
      <div className="payment-container">
        <h1>Confirm your payment</h1>
        <h3>Amount to pay: {price / 100} LEI</h3>
        <hr></hr>
        <div className="payment-stripe-container">
          <StripeContainer price={price} />
        </div>
        <hr></hr>
        <div className="payment-button-div">
          <a href="/shopping">
            <button className="payment-button">Back to shopping</button>
          </a>
        </div>
      </div>
    </div>
  );
}
