import React, { useState, useEffect } from "react";
import WorkerNavbar from "./WorkerNavbar";
import axios from "axios";
import "./Worker.css";
import "./Card.css";
import "./App.css";

export default function WorkerReady() {
  const [orders, setOrders] = useState(null);
  useEffect(() => {
    const getOrders = async () => {
      try {
        let status = "READY";
        const resp = await axios.get(
          "http://localhost:8080/api/order/get-by-status",
          {
            params: { status: status },
          }
        );
        setOrders(resp.data);
        console.log(resp.data);
      } catch (err) {
        console.log(err);
      }
    };
    getOrders();
  }, []);
  function pickOrder(orderId) {
    let driverId = localStorage.getItem("userId");
    let dto = {
      orderId: orderId,
      userId: null,
      workerId: null,
      driverId: driverId,
    };
    axios
      .post("http://localhost:8080/api/order/promote", dto)
      .then((res) => {
        if (res.data === "") {
          console.log("X");
        } else {
          console.log("Order picked by driber  " + driverId);
        }
      })
      .catch((error) => {
        console.log(error);
      });
    window.location.reload();
  }

  if (orders === null) {
    return <div>No orders available</div>;
  }
  return (
    <div>
      <WorkerNavbar />
      <div className="page">
        <div className="page-grid">
          <div className="page-title">ORDERS READY</div>
          <div className="table-responsive">
            <table className="table align-middle">
              <thead className="table-dark">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">ID</th>
                  <th scope="col">ADRESA</th>
                  <th scope="col">TOTAL(LEI)</th>

                  <th scope="col">PICK</th>
                </tr>
              </thead>

              <tbody className="table-group-divider">
                {orders.map((order, key) => (
                  <tr>
                    <th scope="row">{key + 1}</th>
                    <td>{order.id}</td>
                    <td>{order.address}</td>
                    <td>{Math.round(order.total * 100) / 100}</td>

                    <td>
                      {localStorage.getItem("role") === "worker" && (
                        <button disabled>PICK</button>
                      )}

                      {localStorage.getItem("role") === "driver" && (
                        <button onClick={() => pickOrder(order.id)}>
                          PICK
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>Total number of orders: {orders.length}</tfoot>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
