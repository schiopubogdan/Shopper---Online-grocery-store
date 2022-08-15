import React from "react";
import "./SeeProductsModal.css";
const MODAL_STYLES = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "#FFF",
  padding: "20px",
  zIndex: 1000,
  width: "30rem",
  height: "45rem",
  borderStyle: "double",
  borderWidth: "5px",
};
const OVERLAY_STYLES = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0,0,0, .7)",
  zIndex: 1000,
};
export default function SeeProductsModal({ open, onClose, products }) {
  if (!open) return null;
  return (
    <>
      <div style={OVERLAY_STYLES}></div>
      <div style={MODAL_STYLES}>
        <div className="close-modal-div">
          <div className="modal-title">Products</div>
          <div className="close-modal">
            <button className="close-button" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
        <hr className="dropdown-divider" />
        <div className="modal-body">
          {products.map((product, key) => (
            <div className="modal-body-row">
              &#8226; {product.name} {product.weight} {product.measure} -{" "}
              {product.quantity} buc
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
