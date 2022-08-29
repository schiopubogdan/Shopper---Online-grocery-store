import React, { useEffect, useState } from "react";
import WorkerNavbar from "./WorkerNavbar";
import axios from "axios";
import "./Worker.css";
import "./Card.css";
import "./App.css";

export default function WorkerPaid() {
  const [orders, setOrders] = useState(null);
  useEffect(() => {
    const getOrders = async () => {
      try {
        let status = "PAID";
        const resp = await axios.get(
          "http://localhost:8080/api/order/get-by-status",
          {
            params: { status: status },
          }
        );
        const unsortedOrders = resp.data;
        unsortedOrders.sort(function (a, b) {
          return new Date(a.date) - new Date(b.date);
        });

        setOrders(unsortedOrders);
        console.log(resp.data);
      } catch (err) {
        console.log(err);
      }
    };
    getOrders();
  }, []);
  function assignOrder(orderId) {
    let workerId = localStorage.getItem("userId");
    let dto = {
      orderId: orderId,
      userId: null,
      workerId: workerId,
      driverId: null,
    };
    axios
      .post("http://localhost:8080/api/order/promote", dto)
      .then((res) => {
        if (res.data === "") {
          console.log("X");
        } else {
          console.log("Order assigned to worker " + workerId);
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
          <div className="table-responsive">
            <table className="table align-middle">
              <thead className="table-dark">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">ID</th>
                  <th scope="col">DATE</th>

                  <th scope="col">ASSIGN</th>
                </tr>
              </thead>

              <tbody className="table-group-divider">
                {orders.map((order, key) => (
                  <tr>
                    <th scope="row">{key + 1}</th>
                    <td>{order.id}</td>
                    <td>{order.date}</td>

                    <td>
                      {localStorage.getItem("role") === "worker" && (
                        <button onClick={() => assignOrder(order.id)}>
                          ASSIGN
                        </button>
                      )}
                      {localStorage.getItem("role") === "driver" && (
                        <button disabled>ASSIGN</button>
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
