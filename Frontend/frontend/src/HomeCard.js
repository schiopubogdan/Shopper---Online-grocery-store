import React from "react";
import "./HomeCard.css";

export default function HomeCard({ logo, text }) {
  return (
    <div className="home-card">
      <div className="home-card-up-container">
        <div className="vertical-horizontal-center">
          <img src={logo} />
        </div>
      </div>
      <hr></hr>
      <div className="home-card-middle-container">
        <h4 className="home-card-middle-container-text">{text}</h4>
      </div>
      <hr></hr>
      <div className="home-card-down-container">
        <div className="vertical-horizontal-center">
          <button>SEE DETAILS</button>
        </div>
      </div>
    </div>
  );
}
