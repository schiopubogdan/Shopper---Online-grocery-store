import React, { useEffect, useState } from "react";
import WorkerNavbar from "./WorkerNavbar";
import axios from "axios";
import "./Worker.css";
import "./Card.css";
import "./App.css";
import SeeProductsModal from "./Modals/SeeProductsModal";

export default function WorkerInprogress() {
  const [orders, setOrders] = useState(null);
  const [modal, setModal] = useState(false);
  const [products, setProducts] = useState(null);

  useEffect(() => {
    const getOrders = async () => {
      try {
        let status = "IN_PROGRESS";
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
  function readyOrder(orderId) {
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
          console.log("Order marked as ready by user  " + workerId);
        }
      })
      .catch((error) => {
        console.log(error);
      });
    window.location.reload();
  }
  function seeProducts(products) {
    setProducts(products);
    setModal(true);
  }

  if (orders === null) {
    return <div>No orders available</div>;
  }
  return (
    <div>
      <WorkerNavbar />
      <div className="page">
        <div className="page-grid">
          <div className="page-title">ORDERS IN PROGRESS</div>
          <div className="table-responsive">
            <table className="table align-middle">
              <thead className="table-dark">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">ID</th>
                  <th scope="col">TOTAL(LEI)</th>
                  <th scope="col">PRODUCTS</th>
                  <th scope="col">READY</th>
                </tr>
              </thead>

              <tbody className="table-group-divider">
                {orders.map((order, key) => (
                  <tr>
                    <th scope="row">{key + 1}</th>
                    <td>{order.id}</td>
                    <td>{Math.round(order.total * 100) / 100}</td>
                    <td>
                      {localStorage.getItem("role") === "worker" &&
                        localStorage.getItem("userId") === order.workerId && (
                          <button onClick={() => seeProducts(order.products)}>
                            SEE PRODUCTS
                          </button>
                        )}
                      {localStorage.getItem("role") === "worker" &&
                        localStorage.getItem("userId") !== order.workerId && (
                          <button disabled>SEE PRODUCTS</button>
                        )}
                      {localStorage.getItem("role") === "driver" && (
                        <button disabled>SEE PRODUCTS</button>
                      )}
                    </td>

                    <td>
                      {localStorage.getItem("role") === "worker" &&
                        localStorage.getItem("userId") === order.workerId && (
                          <button onClick={() => readyOrder(order.id)}>
                            READY
                          </button>
                        )}
                      {localStorage.getItem("role") === "worker" &&
                        localStorage.getItem("userId") !== order.workerId && (
                          <button disabled>READY</button>
                        )}
                      {localStorage.getItem("role") === "driver" && (
                        <button disabled>READY</button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>Total number of orders: {orders.length}</tfoot>
            </table>
          </div>
          <SeeProductsModal
            open={modal}
            onClose={() => setModal(false)}
            products={products}
          />
        </div>
      </div>
    </div>
  );
}
