import React, { useState, useEffect } from "react";
import WorkerNavbar from "./WorkerNavbar";
import axios from "axios";
import "./Worker.css";
import "./Card.css";
import "./App.css";

export default function WorkerDelivered() {
  const [orders, setOrders] = useState(null);
  useEffect(() => {
    const getOrders = async () => {
      try {
        let status = "DELIVERED";
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

  if (orders === null) {
    return <div>No orders available</div>;
  }
  return (
    <div>
      <WorkerNavbar />
      <div className="page">
        <div className="page-grid">
          <div className="page-title">ORDERS DELIVERED</div>
          <div className="table-responsive">
            <table className="table align-middle">
              <thead className="table-dark">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">ID</th>
                  <th scope="col">TOTAL(LEI)</th>
                  <th scope="col">WORKER ID</th>
                  <th scope="col">DRIVER ID</th>
                </tr>
              </thead>

              <tbody className="table-group-divider">
                {orders.map((order, key) => (
                  <tr>
                    <th scope="row">{key + 1}</th>
                    <td>{order.id}</td>
                    <td>{Math.round(order.total * 100) / 100}</td>

                    <td>{order.workerId}</td>
                    <td>{order.driverId}</td>
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
