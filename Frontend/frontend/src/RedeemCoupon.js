import React from "react";
import "./RedeemCoupon.css";

export default function RedeemCoupon({ discount, streak, clientStreak }) {
  return (
    <div className="redeem-coupon-body">
      <div className="redeem-coupon-discount">DISCOUNT: {discount}%</div>
      <div className="redeem-coupon-streak">STREAK REQUIRED: {streak}</div>
      <div className="redeem-coupon-button">
        {clientStreak >= streak && (
          <button className="reedem-btn">REDEEM</button>
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
