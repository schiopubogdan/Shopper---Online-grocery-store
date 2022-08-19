import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import "./Worker.css";
import "./Card.css";
import "./App.css";
import SeeProductsModal from "./Modals/SeeProductsModal";
import Footer from "./Footer";

export default function ClientHistory() {
  const [deliveredOrders, setDeliveredOrders] = useState(null);
  const [ongoingOrders, setOngoingOrders] = useState(null);

  const [modal, setModal] = useState(false);
  const [products, setProducts] = useState(null);
  useEffect(() => {
    const getOrders = async () => {
      try {
        let id = localStorage.getItem("userId");
        const resp = await axios.get(
          "http://localhost:8080/api/order/get-by-userid",
          {
            params: { id: id },
          }
        );
        const deliveredO = [];
        const ongoingO = [];
        for (var i = 0; i < resp.data.length; i++) {
          if (resp.data[i].status === "DELIVERED") {
            deliveredO.push(resp.data[i]);
          } else {
            ongoingO.push(resp.data[i]);
          }
        }
        setDeliveredOrders(deliveredO);
        setOngoingOrders(ongoingO);
        console.log(resp.data);
      } catch (err) {
        console.log(err);
      }
    };
    getOrders();
  }, []);

  function seeProducts(products) {
    setProducts(products);
    setModal(true);
  }

  if (deliveredOrders === null || ongoingOrders === null) {
    return <div>No deliveredOrders yet</div>;
  }

  return (
    <div>
      <Navbar />
      <div className="page">
        <div className="page-grid">
          <div className="page-title">YOUR FINALISED ORDERS</div>
          <div className="table-responsive">
            <table className="table align-middle">
              <thead className="table-dark">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">DATE</th>
                  <th scope="col">TOTAL(LEI)</th>
                  <th scope="col">PRODUCTS</th>
                </tr>
              </thead>

              <tbody className="table-group-divider">
                {deliveredOrders.map((order, key) => (
                  <tr>
                    <th scope="row">{key + 1}</th>
                    <td>{order.date}</td>
                    <td>{Math.round(order.total * 100) / 100}</td>
                    <td>
                      <button onClick={() => seeProducts(order.products)}>
                        SEE PRODUCTS
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                Total number of delivered orders: {deliveredOrders.length}
              </tfoot>
            </table>
          </div>
          <div className="page-title">YOUR ONGOING ORDERS</div>
          <div className="table-responsive">
            <table className="table align-middle">
              <thead className="table-dark">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">DATE</th>
                  <th scope="col">TOTAL(LEI)</th>
                  <th scope="col">PRODUCTS</th>
                </tr>
              </thead>

              <tbody className="table-group-divider">
                {ongoingOrders.map((order, key) => (
                  <tr>
                    <th scope="row">{key + 1}</th>
                    <td>{order.date}</td>
                    <td>{Math.round(order.total * 100) / 100}</td>
                    <td>
                      <button onClick={() => seeProducts(order.products)}>
                        SEE PRODUCTS
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                Total number of ongoing orders: {ongoingOrders.length}
              </tfoot>
            </table>
          </div>
          <SeeProductsModal
            open={modal}
            onClose={() => setModal(false)}
            products={products}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}
