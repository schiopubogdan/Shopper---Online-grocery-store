import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import "./Stripe.css";
import PaymentForm from "./PaymentForm";
const PUBLIC_KEY =
  "pk_test_51LYwcTJL1gSPo2kbc1pv43P0ERDN8liRZpnMgLeIEze4HSJTwdEYRgnTFPhd8fRrMjMz20Z97TlTHWyBGXjm7sgu00O45kZn6w";
const stripeTestPromise = loadStripe(PUBLIC_KEY);

export default function StripeContainer({ price }) {
  return (
    <Elements stripe={stripeTestPromise}>
      <PaymentForm price={price} />
    </Elements>
  );
}
