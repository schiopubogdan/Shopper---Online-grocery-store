import React, { useState, useEffect } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import "./ClientAnalytics.css";
import axios from "axios";

export default function ClientAnalytics() {
  const [info, setInfo] = useState(null);
  useEffect(() => {
    const getInfo = async () => {
      try {
        let id = localStorage.getItem("userId");
        const resp = await axios.get("http://localhost:8080/api/user/info", {
          params: { id: id },
        });
        setInfo(resp.data);
        console.log(resp.data);
      } catch (err) {
        console.log(err);
      }
    };
    getInfo();
  }, []);
  if (info === null) {
    return <div>No info available</div>;
  }
  return (
    <div>
      {" "}
      <Navbar />
      <div className="page">
        <div className="page-grid">
          <div class="accordion" id="accordionPanelsStayOpenExample">
            <div class="accordion-item">
              <h2 class="accordion-header" id="panelsStayOpen-headingOne">
                <button
                  class="accordion-button"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#panelsStayOpen-collapseOne"
                  aria-expanded="true"
                  aria-controls="panelsStayOpen-collapseOne"
                >
                  THIS MONTH INSIGHTS
                </button>
              </h2>
              <div
                id="panelsStayOpen-collapseOne"
                class="accordion-collapse collapse show"
                aria-labelledby="panelsStayOpen-headingOne"
              >
                <div class="accordion-body">
                  <strong>NUMBER OF ORDERS:</strong> {info.ordersThisMonth}{" "}
                  orders
                  <br></br>
                  <strong>TOTAL VALUE OF ORDERS:</strong>{" "}
                  {Math.round(info.ordersThisMonthValue * 100) / 100} LEI
                </div>
              </div>
            </div>
            <div class="accordion-item">
              <h2 class="accordion-header" id="panelsStayOpen-headingTwo">
                <button
                  class="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#panelsStayOpen-collapseTwo"
                  aria-expanded="false"
                  aria-controls="panelsStayOpen-collapseTwo"
                >
                  LAST MONTH INSIGHTS
                </button>
              </h2>
              <div
                id="panelsStayOpen-collapseTwo"
                class="accordion-collapse collapse"
                aria-labelledby="panelsStayOpen-headingTwo"
              >
                <div class="accordion-body">
                  <strong>NUMBER OF ORDERS:</strong> {info.ordersLatsMonth || 0}{" "}
                  orders
                  <br></br>
                  <strong>TOTAL VALUE OF ORDERS:</strong>{" "}
                  {Math.round(info.ordersLastMonthValue * 100) / 100} LEI
                </div>
              </div>
            </div>
            <div class="accordion-item">
              <h2 class="accordion-header" id="panelsStayOpen-headingThree">
                <button
                  class="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#panelsStayOpen-collapseThree"
                  aria-expanded="false"
                  aria-controls="panelsStayOpen-collapseThree"
                >
                  COUPONS INSIGHTS
                </button>
              </h2>
              <div
                id="panelsStayOpen-collapseThree"
                class="accordion-collapse collapse"
                aria-labelledby="panelsStayOpen-headingThree"
              >
                <div class="accordion-body">
                  <strong>NUMBER OF COUPONS USED:</strong> {info.couponsUsed}{" "}
                  coupons
                  <br></br>
                  <strong>TOTAL VALUE OF COUPONS DISCOUNT:</strong>{" "}
                  {Math.round(info.couponsTotalValue * 100) / 100} LEI
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
