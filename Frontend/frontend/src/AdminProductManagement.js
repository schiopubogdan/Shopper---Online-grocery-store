import React, { useState, useEffect } from "react";
import axios from "axios";
export default function AdminProductManagement() {
  const [category, setCategory] = useState();
  const [measure, setMeasure] = useState();
  const [date, setDate] = useState();
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
    <div className="app-container">
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>NAME</th>
            <th>BRAND</th>
            <th>DESCRIPTION</th>
            <th>RATING</th>
            <th>PRICE</th>
            <th>WEIGHT</th>
            <th>MEASURE</th>
            <th>DATE</th>
            <th>CATEGORY</th>
            <th>PHOTO</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, key) => (
            <tr>
              <th>{key + 1}</th>
              <td>{product.name}</td>
              <td>{product.brand}</td>
              <td>{product.description}</td>
              <td>{product.rating}</td>
              <td>{product.price}</td>
              <td>{product.weight}</td>
              <td>{product.measure}</td>
              <td>{product.date}</td>
              <td>{product.category}</td>
              <td>{product.photo}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
