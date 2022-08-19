import React from "react";
import Navbar from "./Navbar";
import "./Home.css";
import HomeCard from "./HomeCard";
import coupon from "./Images/coupon.png";
import quality from "./Images/high-quality.png";
import promo from "./Images/promo.png";
import delivery from "./Images/fast-delivery.png";
import Footer from "./Footer";

function Home() {
  return (
    <div>
      <Navbar />
      <div className="page">
        <div className="page-grid">
          <div className="home-presentation-div">
            <h1>Welcome!</h1>
            <p>
              NUME_SITE is the new online shop that you're gonna love. Here you
              can find all the top brands and their best products and a lot more
              perks. <a href="/register">Create an account</a> and enjoy
              shopping!
            </p>
          </div>
          <div className="home-separation-div">
            <i class="fa fa-bullhorn myclass" aria-hidden="true" />

            <p className="myclass">
              Below you can check the hero products of this week. They are here
              to save your shopping experience so hurry and check them out!
            </p>
          </div>
          <div className="home-carousel-div">Second</div>
          <div className="home-separation-div">
            <p className="myclass">
              <strong>TIP OF THE DAY:</strong> Download our mobile app and keep
              track of your food expiration date in order to not waste any food.
            </p>
          </div>
          <div className="home-cards-div">
            <HomeCard logo={delivery} text={"FAST DELIVERY"} />
            <HomeCard logo={promo} text={"WEEKLY PROMO"} />
            <HomeCard logo={coupon} text={"DISCOUNT COUPONS"} />
            <HomeCard logo={quality} text={"TOP QUALITY PRODUCTS"} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
export default Home;
