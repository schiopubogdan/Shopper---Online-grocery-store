import React from "react";
import Navbar from "./Navbar";
import "./App.css";
import "./Card.css";

export default function TodaysDeal() {
  return (
    <div>
      <Navbar />
      <div className="page">
        <div className="page-grid">Deals</div>
      </div>
    </div>
  );
}
