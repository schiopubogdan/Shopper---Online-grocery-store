import React, { useState } from "react";
import "./CartProduct.css";
import axios from "axios";

export default function CartProduct(props) {
  const [count, setCount] = useState(props.product.quantity);
  function decrementCount() {
    if (count - 1 < 1) {
      setCount(1);
    } else {
      setCount(count - 1);
      let id = localStorage.getItem("userId");
      let quantity = count - 1;
      let dto = {
        productId: props.product.id,
        userId: id,
        quantity: quantity,
      };
      axios
        .post("http://localhost:8080/api/shopping/update", dto)
        .then((res) => {
          if (res.data === "") {
            alert("X");
          } else {
            console.log("Product quantity decremented");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }
  function incrementCount() {
    setCount(count + 1);
    let id = localStorage.getItem("userId");
    let quantity = count + 1;
    let dto = {
      productId: props.product.id,
      userId: id,
      quantity: quantity,
    };
    axios
      .post("http://localhost:8080/api/shopping/update", dto)
      .then((res) => {
        if (res.data === "") {
          alert("X");
        } else {
          console.log("Product quantity incremented");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
  function removeFromCart() {
    let id = localStorage.getItem("userId");
    let dto = {
      productId: props.product.id,
      userId: id,
    };
    axios
      .post("http://localhost:8080/api/shopping/remove", dto)
      .then((res) => {
        if (res.data === "") {
          alert("X");
        } else {
          alert("Product removed");
        }
      })
      .catch((error) => {
        console.log(error);
      });
    window.location.reload();
  }
  return (
    <div className="cart-product">
      <div className="first">
        {props.product.name} {props.product.weight}
        {[props.product.measure]}
      </div>

      <div className="second">
        <div className="button-div">
          <button className="quantity-button" onClick={decrementCount}>
            {" "}
            -{" "}
          </button>
        </div>

        <div className="button-div">{count}</div>
        <div className="button-div">
          <button className="quantity-button" onClick={incrementCount}>
            {" "}
            +{" "}
          </button>
        </div>
      </div>
      <div className="third">
        {count} x {props.product.price} lei
      </div>
      <div className="fourth">
        <button className="remove-button" onClick={removeFromCart}>
          Remove
        </button>
      </div>
    </div>
  );
}
