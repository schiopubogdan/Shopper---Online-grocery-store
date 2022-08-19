import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import ProductCard from "./ProductCard";
import "./Card.css";
import "./App.css";
import Footer from "./Footer";

export default function Products() {
  const [products, setProducts] = useState(null);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const resp = await axios.get("http://localhost:8080/api/product");
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
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
