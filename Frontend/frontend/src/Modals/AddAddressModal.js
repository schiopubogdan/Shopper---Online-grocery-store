import React, { useState } from "react";
import "./AddressModal.css";
import axios from "axios";
import { toast } from "react-toastify";

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
export default function AddAddressModal({ open, onClose }) {
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [number, setNumber] = useState("");
  const [mentions, setMentions] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const successMessage = "Address successfully added";

  function saveAddress() {
    if (city === "") {
      setError("Field city cannot be empty");
    } else if (street === "") {
      setError("Field street cannot be empty");
    } else if (number === "") {
      setError("Field number cannot be empty");
    } else {
      setSuccess(true);
      //call axios
      let userId = localStorage.getItem("userId");
      let dto = {
        id: "",
        userId: userId,
        city: city,
        street: street,
        number: number,
        mentions: mentions,
      };
      axios
        .post("http://localhost:8080/api/address", dto)
        .then((res) => {
          if (res.data === "") {
            console.log("X");
          } else {
            console.log("Address created");
            toast.success("Address was successfully added.", {
              position: toast.POSITION.TOP_CENTER,
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  function close() {
    setError("");
    setSuccess(false);
    onClose();
  }
  if (!open) return null;
  return (
    <>
      <div style={OVERLAY_STYLES}></div>
      <div style={MODAL_STYLES}>
        <div className="close-modal-div">
          <div className="close-modal">
            <button onClick={close}>Close</button>
          </div>
        </div>
        <div className="input-div">
          City: <input onChange={(e) => setCity(e.target.value)} />
        </div>
        <div className="input-div">
          Street: <input onChange={(e) => setStreet(e.target.value)} />
        </div>
        <div className="input-div">
          Number: <input onChange={(e) => setNumber(e.target.value)} />
        </div>
        <div className="input-div">
          Mentions: <input onChange={(e) => setMentions(e.target.value)} />
        </div>
        <div className="button-div-modal">
          <div className="button-div-div">
            {!success && <button onClick={saveAddress}>Save address</button>}
          </div>
        </div>
        <div className="alert-div">
          {error && (
            <div
              className="alert alert-danger alert-dismissible fade show"
              role="alert"
            >
              {error}
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="alert"
                aria-label="Close"
              ></button>
            </div>
          )}
          {success && (
            <div
              className="alert alert-success d-flex align-items-center"
              role="alert"
            >
              {successMessage}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
