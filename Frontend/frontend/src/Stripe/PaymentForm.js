import React, { useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import "./Stripe.css";

const CARD_OPTIONS = {
  iconStyle: "solid",
  style: {
    base: {
      iconColor: "#c4f0ff",
      color: "#fff",
      fontWeight: 500,
      fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
      fontSize: "16px",
      fontSmoothing: "antialiased",
      ":-webkit-autofill": { color: "#fce883" },
      "::placeholder": { color: "#87bbfd" },
    },
    invalid: {
      iconColor: "#ffc7ee",
      color: "#ffc7ee",
    },
  },
};

export default function PaymentForm({ price }) {
  const [success, setSuccess] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });
    if (!error) {
      try {
        console.log(price);
        const { id } = paymentMethod;
        const response = await axios.post("http://localhost:4000/payment", {
          amount: price,
          id: id,
        });
        if (response.data.success) {
          console.log("Successful payment");
          setSuccess(true);
          //finalizare comanda
          let id = localStorage.getItem("userId");
          let dto = {
            productId: "",
            userId: id,
          };
          axios
            .post("http://localhost:8080/api/shopping/finalize", dto)
            .then((res) => {
              if (res.data === "") {
              } else {
                alert("Order finalized");
              }
            })
            .catch((error) => {
              console.log(error);
            });
        }
      } catch (error) {
        console.log("Error:", error);
      }
    } else {
      console.log(error.message);
    }
  };
  return (
    <>
      {!success ? (
        <form onSubmit={handleSubmit}>
          <fieldset className="FormGroupStripe">
            <div className="FormRowStripe">
              <CardElement options={CARD_OPTIONS} />
            </div>
          </fieldset>
          <button className="pay-button">Pay</button>
        </form>
      ) : (
        <div>
          <h2>Successful payment! Order finalized!</h2>
        </div>
      )}
    </>
  );
}
