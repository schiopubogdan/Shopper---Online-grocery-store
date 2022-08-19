import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import "./Profile.css";
import AddAddressModal from "./Modals/AddAddressModal";
import ModifyAddressModal from "./Modals/ModifyAddressModal";
import axios from "axios";
import Footer from "./Footer";

export default function Profile() {
  const [addAddress, setAddAddress] = useState(false);
  const [modifyAddress, setModifyAddress] = useState(false);
  const [address, setAddress] = useState(null);
  const [hasAddress, setHasAddress] = useState(false);
  useEffect(() => {
    const getAddress = async () => {
      try {
        let id = localStorage.getItem("userId");
        const resp = await axios.get("http://localhost:8080/api/address/get", {
          params: { id: id },
        });
        setAddress(resp.data);
        if (resp.data !== null) {
          setHasAddress(true);
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
  return (
    <div>
      <Navbar />
      <div className="page">
        <div className="page-grid">
          <div className="container">
            <div className="address-div">
              <div className="address-div-header">Address</div>
              <div className="address-div-buttons">
                {address && (
                  <button className="address-div-button" disabled>
                    Add an address
                  </button>
                )}
                {!address && (
                  <button
                    className="address-div-button"
                    onClick={() => setAddAddress(true)}
                  >
                    Add an address
                  </button>
                )}
                {address && (
                  <button
                    className="address-div-button"
                    onClick={() => setModifyAddress(true)}
                  >
                    Modify address
                  </button>
                )}
                {!address && (
                  <button className="address-div-button" disabled>
                    Modify address
                  </button>
                )}
              </div>
            </div>
          </div>
          <AddAddressModal
            open={addAddress}
            onClose={() => setAddAddress(false)}
          />
          <div className="container">
            <div className="address-div">
              <div className="address-div-header">Card</div>
              <div className="address-div-buttons">
                <button className="address-div-button">Add a card</button>
                <button className="address-div-button">Select a card</button>
              </div>
            </div>
          </div>
          <ModifyAddressModal
            open={modifyAddress}
            onClose={() => setModifyAddress(false)}
            currentCity={address.city}
            currentStreet={address.street}
            currentNumber={address.number}
            currentMentions={address.mentions}
            id={address.id}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}
