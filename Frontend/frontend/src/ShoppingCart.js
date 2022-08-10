import axios from "axios";
import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { Button } from "react-bootstrap";
import "./Cart.css";
import CartProduct from "./CartProduct";
import CartPrice from "./CartPrice";
import CartClear from "./CartClear";

export default function ShoppingCart() {
  const [products, setProducts] = useState(null);
  const [itemsPrice, setItemsPrice] = useState();

  function finalizeOrder() {
    let id = localStorage.getItem("userId");
    let dto = {
      productId: "",
      userId: id,
    };
    axios
      .post("http://localhost:8080/api/shopping/finalize", dto)
      .then((res) => {
        if (res.data === "") {
          alert("X");
        } else {
          alert("Order finalized");
        }
      })
      .catch((error) => {
        console.log(error);
      });
    window.location.reload();
  }
  useEffect(() => {
    const getProducts = async () => {
      try {
        let id = localStorage.getItem("userId");
        const resp = await axios.get("http://localhost:8080/api/shopping/get", {
          params: { id: id },
        });
        setProducts(resp.data.products);
        setItemsPrice(resp.data.total);
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
        <div className="page-grid">
          <div className="cart">
            <div className="cart-head">
              <h3 className="display-6 fw-bold my-4 cart-head-title">
                Checkout
              </h3>
            </div>
            <div className="cart-body">
              {/* <h3 className="display-6 fw-bold my-4">Products</h3> */}
              <CartClear />
              {/* aici o sa vina un if
              - daca products e gol -> afisare ceva mesaj si buton dezactivat de checkout
              - daca products nu e gol -> map pt fiecare produs*/}
              {products.map((product, key) => (
                <CartProduct product={product} />
              ))}
              <hr className="dropdown-divider" />

              <CartPrice text="Items price" price={itemsPrice} />
              <CartPrice text="Shipping price" price="14.99" />
              <CartPrice
                text="Total price"
                price={Math.round((itemsPrice + 14.99) * 100) / 100}
              />
            </div>
            <hr className="dropdown-divider" />
            <div className="cart-footer">
              <Button className="checkout-button" onClick={finalizeOrder}>
                Finalize order
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
