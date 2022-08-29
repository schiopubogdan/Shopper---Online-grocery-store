import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../Navbar";
import ProductCard from "../ProductCard";
import "../Card.css";
import "../App.css";
import Footer from "../Footer";

export default function Pantry() {
  const [products, setProducts] = useState([]);
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        let category = "PANTRY";
        const resp = await axios.get(
          "http://localhost:8080/api/product/get-by-category",
          { params: { category: category } }
        );
        setProducts(resp.data);
        console.log(resp.data);
      } catch (err) {
        console.log(err);
      }
      try {
        let category = "PANTRY";
        const resp = await axios.get(
          "http://localhost:8080/api/product/get-category-brands",
          { params: { category: category } }
        );
        setBrands(resp.data);
        console.log(resp.data);
      } catch (err) {
        console.log(err);
      }
    };
    getProducts();
  }, []);

  if (products === null || brands === null) {
    return <div>No products available</div>;
  }
  return (
    <div>
      <Navbar />
      <div className="page">
        <div className="brands">
          <div className="brands-header">
            <strong>Brands</strong>
          </div>
          <hr></hr>
          <div className="brands-body">
            {brands.map((brand, key) => (
              <div className="brand-name">&#8226; {brand}</div>
            ))}
          </div>
        </div>
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
