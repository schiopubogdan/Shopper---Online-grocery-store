import React from "react";
import "./RedeemCoupon.css";
import axios from "axios";

export default function RedeemCoupon({
  discount,
  streak,
  clientStreak,
  redeemCoupon,
}) {
  return (
    <div className="redeem-coupon-body">
      <div className="redeem-coupon-discount">DISCOUNT: {discount}%</div>
      <div className="redeem-coupon-streak">STREAK REQUIRED: {streak}</div>
      <div className="redeem-coupon-button">
        {clientStreak >= streak && (
          <button className="reedem-btn" onClick={redeemCoupon}>
            REDEEM
          </button>
        )}
        {clientStreak < streak && (
          <button className="reedem-btn" disabled>
            REDEEM
          </button>
        )}
      </div>
    </div>
  );
}
