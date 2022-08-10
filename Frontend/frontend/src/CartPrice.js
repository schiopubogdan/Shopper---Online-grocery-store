import React from "react";
import "./CartPrice.css";

export default function CartPrice(props) {
  return (
    <div className="cart-price-div">
      <div className="cart-price-first">
        <div className="text">{props.text}</div>
      </div>
      <div className="cart-price-second">
        <div className="text">{props.price} lei</div>
      </div>
    </div>
  );
}
