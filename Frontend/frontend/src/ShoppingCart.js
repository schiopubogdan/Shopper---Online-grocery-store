import axios from "axios";
import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { Button } from "react-bootstrap";
import "./Cart.css";
import CartProduct from "./CartProduct";
import CartPrice from "./CartPrice";
import CartClear from "./CartClear";
import CheckAddressModal from "./Modals/CheckAddressModal";
import Footer from "./Footer";

export default function ShoppingCart() {
  const [candidateDiscount, setCandidateDiscout] = useState();
  const [candidateCouponCode, setCandidateCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [couponUsed, setCouponUsed] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [inputCode, setInputCode] = useState("");
  const [couponMessage, setCouponMessage] = useState("");
  const [products, setProducts] = useState(null);
  const [itemsPrice, setItemsPrice] = useState();
  const [addressSelected, setAddressSelected] = useState(false);
  const [modal, setModal] = useState(false);
  const [discountPrice, setDiscountPrice] = useState(0);

  function checkAddress() {
    if (addressSelected === false) {
      //
      console.log("Address not selected");
      setModal(true);
    } else {
      console.log("Address selected");
      finalizeOrder();
    }
  }
  function useCoupon() {
    //axios call de verificare daca esti codul clientului -> return coupon
    //setare messaj
    if (inputCode !== "") {
      axios
        .post(`http://localhost:8080/api/coupon/check?couponCode=${inputCode}`)
        .then((res) => {
          if (res.data === "") {
            setCouponMessage("Wrong!");
          } else {
            setCandidateCouponCode(res.data.code);
            setCandidateDiscout(res.data.procent);
            setCouponMessage("Good!");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setCouponMessage("Wrong!");
    }
  }
  function applyCoupon() {
    let id = localStorage.getItem("userId");
    let dto = {
      userId: id,
      procent: candidateDiscount,
      orders: 0,
      code: candidateCouponCode,
    };
    axios
      .post("http://localhost:8080/api/shopping/apply-coupon", dto)
      .then((res) => {
        if (res.data === "") {
          console.log("X");
        } else {
          //
        }
      })
      .catch((error) => {
        console.log(error);
      });
    window.location.reload();
  }
  function uncheck() {}

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
          setDiscountPrice(0);
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
        setCouponUsed(resp.data.couponUsed);
        setCouponCode(resp.data.couponCode);
        setDiscountPrice(resp.data.discount);
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
              <div className="cart-coupon">
                <h4 className="cart-coupon-first">
                  Have an active coupon? Use the code here.
                </h4>
                {couponUsed ? (
                  <input
                    className="cart-coupon-second"
                    disabled
                    value={couponCode}
                  ></input>
                ) : (
                  <input
                    className="cart-coupon-second"
                    onChange={(event) => setInputCode(event.target.value)}
                  ></input>
                )}
                {couponUsed ? (
                  <button className="cart-coupon-third" disabled>
                    CHECK
                  </button>
                ) : (
                  <button className="cart-coupon-third" onClick={useCoupon}>
                    CHECK
                  </button>
                )}
                <div className="cart-coupon-fourth ">{couponMessage}</div>
                {couponUsed ? (
                  <button className="cart-coupon-fifth" disabled>
                    APPLY
                  </button>
                ) : (
                  <button className="cart-coupon-fifth" onClick={applyCoupon}>
                    APPLY
                  </button>
                )}
              </div>
              <hr className="dropdown-divider" />
              <CartPrice text="Items price" price={itemsPrice} />
              <CartPrice text="Shipping price" price="14.99" />
              <CartPrice text="Coupon discount" price={discountPrice} />
              <CartPrice
                text="Total price"
                price={Math.round((itemsPrice + 14.99) * 100) / 100}
              />
            </div>
            <hr className="dropdown-divider" />
            <div className="cart-footer">
              <Button className="checkout-button" onClick={checkAddress}>
                Finalize order
              </Button>
            </div>
          </div>
          <CheckAddressModal
            open={modal}
            onClose={() => setModal(false)}
            onCheck={() => setAddressSelected(true)}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}
