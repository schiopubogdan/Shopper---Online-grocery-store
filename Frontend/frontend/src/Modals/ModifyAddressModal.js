import React, { useState } from "react";
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
  width: "45rem",
  height: "23rem",
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
export default function ModifyAddressModal({
  id,
  currentCity,
  currentStreet,
  currentNumber,
  currentMentions,
  open,
  onClose,
}) {
  const [newCity, setNewCity] = useState("");

  const [newStreet, setNewStreet] = useState("");

  const [newNumber, setNewNumber] = useState("");

  const [newMentions, setNewMentions] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const successMessage = "Address successfully modified";

  function modifyAddress() {
    let userId = localStorage.getItem("userId");
    let dto = {
      id: id,
      userId: userId,
      city: newCity,
      street: newStreet,
      number: newNumber,
      mentions: newMentions,
    };
    if (
      currentCity !== newCity ||
      currentStreet !== newStreet ||
      currentNumber !== newNumber ||
      currentMentions !== newMentions
    ) {
      //apel axios
      setSuccess(true);
      axios
        .put("http://localhost:8080/api/address", dto)
        .then((res) => {
          if (res.data === "") {
            console.log("X");
          } else {
            console.log("Address updated");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setError("New password is identical with the current one");
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
        <div className="city">
          <div className="input-div-pattern">
            Current city: <input value={currentCity} disabled />
          </div>
          <div className="input-div-pattern">
            New city: <input onChange={(e) => setNewCity(e.target.value)} />
          </div>
        </div>
        <div className="street">
          <div className="input-div-pattern">
            Current street: <input value={currentStreet} disabled />
          </div>
          <div className="input-div-pattern">
            New street: <input onChange={(e) => setNewStreet(e.target.value)} />
          </div>
        </div>
        <div className="number">
          <div className="input-div-pattern">
            Current number: <input value={currentNumber} disabled />
          </div>
          <div className="input-div-pattern">
            New number: <input onChange={(e) => setNewNumber(e.target.value)} />
          </div>
        </div>
        <div className="mentions">
          <div className="input-div-pattern">
            Current mentions: <input value={currentMentions} disabled />
          </div>
          <div className="input-div-pattern">
            New mentions:{" "}
            <input onChange={(e) => setNewMentions(e.target.value)} />
          </div>
        </div>

        <div className="button-div">
          <div className="button-div-div">
            {!success && (
              <button onClick={modifyAddress}>Update address</button>
            )}
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
