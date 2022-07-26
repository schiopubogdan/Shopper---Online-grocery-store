import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./NavbarVisitor";
import ProductCard from "./ProductCard";
import "./Card.css";

export default function Products() {
  const [error, setError] = useState(false);
  const [products, setProducts] = useState(null);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const resp = await axios.get("http://localhost:8080/api/product");
        setProducts(resp.data);
        console.log(resp.data);
      } catch (err) {
        console.log(error);
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
      <div className="card-grid">
        {products.map((product, key) => (
          <div>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
}
