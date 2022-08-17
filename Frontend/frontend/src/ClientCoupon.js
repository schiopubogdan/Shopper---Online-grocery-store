import React from "react";
import "./ClientCoupon.css";

export default function ClientCoupon({ coupon }) {
  return (
    <div className="coupon-body">
      <div className="coupon-code">CODE: {coupon.code}</div>
      <div className="coupon-discount">DISCOUNT: {coupon.procent}%</div>
    </div>
  );
}
