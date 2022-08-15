import React from "react";
import "./PaidOrderCard.css";

export default function PaidOrderCard(props) {
  return (
    <div className="paid-order-card">
      <div className="paid-order-card-first">{props.order.id}</div>

      <div className="paid-order-card-second">{props.order.date}</div>
      <div className="paid-order-card-third">{props.order.total}</div>
      <div className="paid-order-card-fourth">
        <button>Assign</button>
      </div>
    </div>
  );
}
