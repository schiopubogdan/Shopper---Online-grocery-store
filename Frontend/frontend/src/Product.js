import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";
import axios from "axios";

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

  return <div>Product</div>;
}
