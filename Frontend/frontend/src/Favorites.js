import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import ProductCardFavorite from "./ProductCardFavorite";
import "./App.css";
import "./Card.css";
import axios from "axios";

export default function Favorites() {
  const [products, setProducts] = useState(null);

  useEffect(() => {
    const getProducts = async () => {
      try {
        let id = localStorage.getItem("userId");
        const resp = await axios.get("http://localhost:8080/api/favorite/get", {
          params: { id: id },
        });
        setProducts(resp.data);
        console.log(resp.data);
      } catch (err) {
        console.log(err);
      }
    };
    getProducts();
  }, []);
  if (products === null) {
    return <div>No products available</div>;
  }
  return (
    <div>
      <Navbar />
      <div className="page">
        <div className="card-grid">
          {products.map((product, key) => (
            <div className="product-container">
              <ProductCardFavorite product={product} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
