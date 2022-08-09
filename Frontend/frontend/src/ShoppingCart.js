import axios from "axios";
import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";

export default function ShoppingCart() {
  const [products, setProducts] = useState(null);

  useEffect(() => {
    const getProducts = async () => {
      try {
        let id = localStorage.getItem("userId");
        const resp = await axios.get("http://localhost:8080/api/shopping/get", {
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

  return (
    <div>
      <Navbar />
      <div className="page">
        <div className="page-grid">Shopping cart</div>
      </div>
    </div>
  );
}
