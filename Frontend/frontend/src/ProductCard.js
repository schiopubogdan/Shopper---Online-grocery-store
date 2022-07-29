import React from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

export default function ProductCard(props) {
  return (
    <>
      {localStorage.getItem("role") === "client" ? (
        <div className="card" style={{ width: "18rem" }}>
          <img src="..." className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{props.product.name}</h5>
            <p className="card-text">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
          </div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">An item</li>
            <li className="list-group-item">A second item</li>
            <li className="list-group-item">
              <Link
                to={"/products/" + props.product.id}
                state={{ id: props.product.id }}
              >
                See product details
              </Link>
            </li>
          </ul>
          <div className="card-body">
            <a href="#" className="card-link">
              <i className="fa fa-heart" aria-hidden="true"></i>
            </a>
            <a href="#" className="card-link">
              <i className="fa fa-shopping-cart" aria-hidden="true"></i>
            </a>
          </div>
        </div>
      ) : (
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
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">{props.product.name}</h5>
          </div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">rating</li>
            <li className="list-group-item">price</li>
            <li className="list-group-item">
              <Link
                to={"/products/" + props.product.id}
                state={{ id: props.product.id }}
              >
                More details...
              </Link>
            </li>
          </ul>
          <div className="card-body">
            <a href="/login" className="btn btn-outline-primary ms-2">
              Log in for more actions
            </a>
          </div>
        </div>
      )}
    </>
  );
}
