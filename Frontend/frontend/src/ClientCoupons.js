import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import ClientCoupon from "./ClientCoupon";
import RedeemCoupon from "./RedeemCoupon";
import Footer from "./Footer";
import { toast } from "react-toastify";

export default function ClientCoupons() {
  const [coupons, setCoupons] = useState(null);
  const [client, setClient] = useState(null);
  useEffect(() => {
    const getCoupons = async () => {
      try {
        let id = localStorage.getItem("userId");
        const resp = await axios.get("http://localhost:8080/api/coupon/get", {
          params: { id: id },
        });
        setCoupons(resp.data);
        console.log(resp.data);
      } catch (err) {
        console.log(err);
      }
      try {
        let id = localStorage.getItem("userId");
        const resp2 = await axios.get("http://localhost:8080/api/user/get", {
          params: { id: id },
        });
        setClient(resp2.data);
        console.log(resp2.data);
      } catch (err) {
        console.log(err);
      }
    };
    getCoupons();
  }, []);
  function redeemCoupon10() {
    let clientId = localStorage.getItem("userId");
    let dto = {
      userId: clientId,
      procent: 10,
      orders: 5,
      code: "",
    };
    axios
      .post("http://localhost:8080/api/coupon/redeem", dto)
      .then((res) => {
        if (res.data === "") {
          console.log("X");
        } else {
          console.log("Coupon redeemed");
        }
      })
      .catch((error) => {
        console.log(error);
      });
    toast.success("Coupon redeemed successfully.", {
      position: toast.POSITION.TOP_CENTER,
    });
  }
  function redeemCoupon15() {
    let clientId = localStorage.getItem("userId");
    let dto = {
      userId: clientId,
      procent: 15,
      orders: 7,
      code: "",
    };
    axios
      .post("http://localhost:8080/api/coupon/redeem", dto)
      .then((res) => {
        if (res.data === "") {
          console.log("X");
        } else {
          console.log("Coupon redeemed");
        }
      })
      .catch((error) => {
        console.log(error);
      });
    toast.success("Coupon redeemed successfully.", {
      position: toast.POSITION.TOP_CENTER,
    });
  }
  function redeemCoupon20() {
    let clientId = localStorage.getItem("userId");
    let dto = {
      userId: clientId,
      procent: 20,
      orders: 10,
      code: "",
    };
    axios
      .post("http://localhost:8080/api/coupon/redeem", dto)
      .then((res) => {
        if (res.data === "") {
          console.log("X");
        } else {
          console.log("Coupon redeemed");
        }
      })
      .catch((error) => {
        console.log(error);
      });

    toast.success("Coupon redeemed successfully.", {
      position: toast.POSITION.TOP_CENTER,
    });
  }
  if (coupons === null || client === null) {
    return <div>No coupons available</div>;
  }
  return (
    <div>
      <Navbar />
      <div className="page">
        <div className="page-grid">
          <div className="coupons-info">
            <p>
              Here you can redeem coupons for a certain streak of completed
              orders. After you redeem a coupon, it will appear below in your
              active coupons and your streak will be modified accordingly. To
              use your coupon, at checkout insert the code and benefit from the
              discount. After that, your coupon will disapper from your list of
              available coupons, but don't worry, you can get it back. Keep
              completing orders and increase your streak in order to gain more
              discounts!
            </p>
          </div>
          <hr></hr>
          <div className="coupons-client">
            <h1>Your current orders streak: {client.orders}</h1>
            <h2>Your active coupons: {coupons.length}</h2>
            {coupons.map((coupon, key) => (
              <ClientCoupon coupon={coupon} />
            ))}
          </div>
          <hr></hr>
          <div className="coupons-redeem">
            <h1>Coupons redeem belod</h1>
            <RedeemCoupon
              discount={"10"}
              streak={"5"}
              clientStreak={client.orders}
              redeemCoupon={redeemCoupon10}
            />
            <RedeemCoupon
              discount={"15"}
              streak={"7"}
              clientStreak={client.orders}
              redeemCoupon={redeemCoupon15}
            />
            <RedeemCoupon
              discount={"20"}
              streak={"10"}
              clientStreak={client.orders}
              redeemCoupon={redeemCoupon20}
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
