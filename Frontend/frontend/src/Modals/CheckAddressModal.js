import React, { useState, useEffect } from "react";
import "./AddressModal.css";
import axios from "axios";
const MODAL_STYLES = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "#FFF",
  padding: "20px",
  zIndex: 1000,
  width: "40rem",
  height: "20rem",
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
export default function CheckAddressModal({ open, onClose, onCheck }) {
  const [address, setAddress] = useState(null);
  const [hasAddress, setHasAddress] = useState("");
  useEffect(() => {
    const getAddress = async () => {
      try {
        let id = localStorage.getItem("userId");
        const resp = await axios.get("http://localhost:8080/api/address/get", {
          params: { id: id },
        });
        setAddress(resp.data);
        if (resp.data !== "") {
          setHasAddress("address");
        }
      } catch (err) {
        console.log(err);
      }
    };
    getAddress();
  }, []);
  if (address === null) {
    return <div>No address</div>;
  }
  if (!open) return null;
  return (
    <>
      <div style={OVERLAY_STYLES}></div>
      <div style={MODAL_STYLES}>
        <div className="close-modal-div">
          <div className="close-modal">
            <button onClick={onClose}>Close</button>
          </div>
        </div>
        <div className="address-status-div">
          {hasAddress && (
            <div>
              <div>
                Current address: {address.city} {address.street}{" "}
                {address.number}
              </div>
              <div>
                <button onClick={onCheck}>Select this one</button>
                <a href="/profile">
                  <button>Change address</button>
                </a>
              </div>
            </div>
          )}
          {!hasAddress && (
            <div>
              <div>
                You don't have an address. Please go to profile and add one.
              </div>
              <div>
                <a href="/profile">
                  <button>Go to profile</button>
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
