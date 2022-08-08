import React from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { Rating, Typography } from "@mui/material";
import axios from "axios";
import { reload } from "firebase/auth";

export default function ProductCardFavorite(props) {
  function removeFromFavorite() {
    //apel axios
    let id = localStorage.getItem("userId");
    let dto = {
      productId: props.product.id,
      userId: id,
    };
    axios
      .post("http://localhost:8080/api/favorite/remove", dto)
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
          <Button className="btn btn-danger" onClick={removeFromFavorite}>
            Remove from favorites{" "}
            <i className="fa fa-heart" aria-hidden="true"></i>
          </Button>
        </a>
      </div>
    </div>
  );
}
