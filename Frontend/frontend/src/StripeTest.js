import { useState } from "react";
import "./Stripe/Stripe.css";
import StripeContainer from "./Stripe/StripeContainer";

export default function StripeTest() {
  const [showItem, setShowItem] = useState(false);
  return (
    <div>
      <h1>The Spatula Store</h1>
      {showItem ? (
        <StripeContainer />
      ) : (
        <>
          <h3>$10.00</h3>

          <button onClick={() => setShowItem(true)}>Purchase Spatula</button>
        </>
      )}
    </div>
  );
}
