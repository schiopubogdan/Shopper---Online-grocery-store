import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";
import axios from "axios";
import Navbar from "./Navbar";
import { Rating, Typography } from "@mui/material";
import { Button } from "react-bootstrap";
import "./Card.css";
import Footer from "./Footer";
import { toast } from "react-toastify";

export default function Product() {
  const location = useLocation();
  const [product, setProduct] = useState([]);
  const [isPresent, setIsPresent] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const { id } = location.state;

  useEffect(() => {
    const getProduct = async () => {
      try {
        let userId = localStorage.getItem("userId");
        const resp = await axios.get("http://localhost:8080/api/product/get", {
          params: { id: id },
        });
        setProduct(resp.data);
        console.log(resp.data);
        let dto = {
          productId: id,
          userId: userId,
        };
        axios
          .post("http://localhost:8080/api/favorite/check", dto)
          .then((res) => {
            if (res.data === "") {
              console.log("Some error");
            } else {
              setIsPresent(res.data);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      } catch (err) {
        console.log(err);
      }
    };
    getProduct();
  }, []);

  function addToFavorites() {
    if (localStorage.getItem("role") === "client") {
      // axios call pentru adaugare produs
      let userId = localStorage.getItem("userId");
      let dto = {
        productId: id,
        userId: userId,
      };
      axios
        .post("http://localhost:8080/api/favorite/add", dto)
        .then((res) => {
          if (res.data === "") {
            console.log("X");
          } else {
            console.log("Product added");
          }
        })
        .catch((error) => {
          console.log(error);
        });
      toast.success("Item was successfully added.", {
        position: toast.POSITION.TOP_CENTER,
      });
    } else {
      toast.error("You must be logged in order to perform this action!", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  }
  function removeFromFavorite() {
    //apel axios
    let userId = localStorage.getItem("userId");
    let dto = {
      productId: id,
      userId: userId,
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
  function addToCart() {
    if (localStorage.getItem("role") === "client") {
      // axios call pentru adaugare produs
      let userId = localStorage.getItem("userId");
      let dto = {
        productId: id,
        userId: userId,
        quantity: quantity,
      };
      console.log(dto);
      axios
        .post("http://localhost:8080/api/shopping/add", dto)
        .then((res) => {
          if (res.data === "") {
            console.log("X");
          } else {
            console.log("Product added");
          }
        })
        .catch((error) => {
          console.log(error);
        });
      toast.success("Item was successfully added to cart.", {
        position: toast.POSITION.TOP_CENTER,
      });
    } else {
      toast.error("You must be logged in order to perform this action!", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  }

  return (
    <div>
      <Navbar />
      <div className="page">
        <div className="page-grid">
          <section className="container">
            <div className="row mt-5">
              <div className="col-lg-5 col-md-12 col-12">
                <img className="img-fluid w-100" src={product.photoURL} />
              </div>
              <div className="col-lg-6 col-md-12 col-12">
                <h4 className="text-uppercase text-black-50">
                  {product.category}
                </h4>
                <hr className="dropdown-divider"></hr>
                <h1 className="display-5">
                  {product.name} {product.weight} {product.measure}
                </h1>
                <hr className="dropdown-divider"></hr>
                {/* <p className="lead">
                  <Typography component="legend">Rating</Typography>
                  <Rating
                    name="read-only"
                    value={product.rating}
                    precision={0.1}
                    readOnly
                  />
                </p> */}
                <h3 className="display-6 fw-bold my-4">{product.price} Lei</h3>
                <input
                  className="product-number"
                  type="number"
                  min="1"
                  max="20"
                  onChange={(e) => setQuantity(e.target.value)}
                ></input>
                <Button onClick={addToCart}>
                  Add to cart{" "}
                  <i className="fa fa-shopping-cart" aria-hidden="true"></i>
                </Button>
                {isPresent && (
                  <Button
                    className="btn btn-danger product-details-button"
                    onClick={removeFromFavorite}
                  >
                    Remove from favorites{" "}
                    <i className="fa fa-heart" aria-hidden="true"></i>
                  </Button>
                )}
                {!isPresent && (
                  <Button
                    className="product-details-button"
                    onClick={addToFavorites}
                  >
                    Add to favorites{" "}
                    <i className="fa fa-heart" aria-hidden="true"></i>
                  </Button>
                )}

                <a href="/shopping">
                  <Button className="product-details-button">Go to cart</Button>
                </a>
                <hr className="dropdown-divider" />
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
      <Footer />
    </div>
  );
}
