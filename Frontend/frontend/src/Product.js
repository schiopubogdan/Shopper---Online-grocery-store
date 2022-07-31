import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";
import axios from "axios";
import Navbar from "./Navbar";
import { Rating, Typography } from "@mui/material";
import { Button } from "react-bootstrap";
import "./Card.css";

export default function Product() {
  const location = useLocation();
  const [product, setProduct] = useState([]);
  const { id } = location.state;

  useEffect(() => {
    const getProduct = async () => {
      try {
        const resp = await axios.get("http://localhost:8080/api/product/get", {
          params: { id: id },
        });
        setProduct(resp.data);
        console.log(resp.data);
      } catch (err) {
        console.log(err);
      }
    };
    getProduct();
  }, []);
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
    <div>
      <Navbar />
      <div className="page">
        <div className="page-grid">
          <section className="container my-5 pt 5">
            <div className="row mt-5">
              <div className="col-lg-5 col-md-12 col-12">
                <img className="img-fluid w-100" src={product.photoURL} />
              </div>
              <div className="col-lg-6 col-md-12 col-12">
                <h4 className="text-uppercase text-black-50">
                  {product.category}
                </h4>
                <hr class="dropdown-divider"></hr>
                <h1 className="display-5">
                  {product.name} {product.weight} {product.measure}
                </h1>
                <hr class="dropdown-divider"></hr>
                <p className="lead">
                  <Typography component="legend">Rating</Typography>
                  <Rating
                    name="read-only"
                    value={product.rating}
                    precision={0.1}
                    readOnly
                  />
                </p>
                <h3 className="display-6 fw-bold my-4">{product.price} Lei</h3>
                <input
                  className="product-number"
                  type="number"
                  min="1"
                  max="20"
                ></input>
                <Button onClick={addToCart}>
                  Add to cart{" "}
                  <i className="fa fa-shopping-cart" aria-hidden="true"></i>
                </Button>
                <Button
                  className="product-details-button"
                  onClick={addToFavorites}
                >
                  Add to favorites{" "}
                  <i className="fa fa-heart" aria-hidden="true"></i>
                </Button>
                <Button className="product-details-button">Go to cart</Button>
                <hr class="dropdown-divider" />
                <h4>Product details</h4>
                <span>
                  <div>Brand: {product.brand}</div>
                  <div>Name: {product.name}</div>
                  <div>Product description: {product.description}</div>
                </span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
