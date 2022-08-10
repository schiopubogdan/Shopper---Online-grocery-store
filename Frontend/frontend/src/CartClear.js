import React from "react";
import "./CartClear.css";
import axios from "axios";

export default function CartClear() {
  function clearCart() {
    let id = localStorage.getItem("userId");
    let dto = {
      productId: "",
      userId: id,
    };
    axios
      .post("http://localhost:8080/api/shopping/clear", dto)
      .then((res) => {
        if (res.data === "") {
          alert("X");
        } else {
          alert("Cart cleared");
        }
      })
      .catch((error) => {
        console.log(error);
      });
    window.location.reload();
  }

  return (
    <div className="cart-clear-div">
      <div className="cart-clear-first">
        <div className="text">
          <p className="thicker">Products</p>
        </div>
      </div>
      <div className="cart-clear-second">
        <button className="clear-button" onClick={clearCart}>
          Clear all
        </button>
      </div>
    </div>
  );
}
