import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import ProductCardFavorite from "./ProductCardFavorite";
import "./App.css";
import "./Card.css";

export default function Favorites() {
  const [products, setProducts] = useState(null);
  useEffect(() => {
    var data = JSON.parse(localStorage.getItem("favorites"));
    setProducts(data);
    console.log(data);
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
