import React from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { Rating, Typography } from "@mui/material";

export default function ProductCard(props) {
  function addToFavorites() {
    console.log("Add to favorites clicked");
    if (localStorage.getItem("role") === "client") {
      //
      alert("Item was successfully added.");
    } else {
      alert("You must be logged in order to perform this action!");
    }
  }
  function addToCart() {
    console.log("Add to cart clicked");
    if (localStorage.getItem("role") === "client") {
      //
      alert("Item was successfully added.");
    } else {
      alert("You must be logged in order to perform this action!");
    }
  }
  return (
    <div
      className="card border-primary "
      style={{
        width: "18rem",
        border: "1px  solid",
        boxShadow: " 5px 10px #888888",
      }}
    >
      <img
        src={props.product.photoURL}
        className="card-img-top"
        style={{ width: "18rem", height: "15rem" }}
      />
      <div className="card-body">
        <h5 className="card-title">{props.product.name}</h5>
      </div>
      <ul className="list-group list-group-flush">
        <li className="list-group-item">
          <Typography component="legend">Rating</Typography>
          <Rating
            name="read-only"
            value={props.product.rating}
            precision={0.1}
            readOnly
          />
        </li>
        <li className="list-group-item">Price: {props.product.price} Lei</li>
        <li className="list-group-item">
          <Link
            to={"/products/" + props.product.id}
            state={{ id: props.product.id }}
          >
            See product details
          </Link>
        </li>
      </ul>
      <div className="card-body bottom-part">
        <a className="card-link">
          <Button onClick={addToFavorites}>
            Add to favorites <i className="fa fa-heart" aria-hidden="true"></i>
          </Button>
        </a>
        <a className="card-link">
          <Button onClick={addToCart}>
            Add to cart{" "}
            <i className="fa fa-shopping-cart" aria-hidden="true"></i>
          </Button>
        </a>
      </div>
    </div>
  );
}