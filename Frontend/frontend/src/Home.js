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
            <i className="fa fa-bullhorn myclass" aria-hidden="true" />

            <p className="myclass">
              Below you can check the hero products of this week. They are here
              to save your shopping experience so hurry and check them out!
            </p>
          </div>
          <div className="home-carousel-div">
            <div
              id="carouselExampleIndicators"
              className="carousel slide"
              data-ride="carousel"
            >
              <ol className="carousel-indicators">
                <li
                  data-target="#carouselExampleIndicators"
                  data-slide-to="0"
                  className="active"
                ></li>
                <li
                  data-target="#carouselExampleIndicators"
                  data-slide-to="1"
                ></li>
                <li
                  data-target="#carouselExampleIndicators"
                  data-slide-to="2"
                ></li>
              </ol>
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <img className="d-block w-100" src="..." alt="First slide" />
                </div>
                <div className="carousel-item">
                  <img className="d-block w-100" src="..." alt="Second slide" />
                </div>
                <div className="carousel-item">
                  <img className="d-block w-100" src="..." alt="Third slide" />
                </div>
              </div>
              <a
                className="carousel-control-prev"
                href="#carouselExampleIndicators"
                role="button"
                data-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
                <span className="sr-only">Previous</span>
              </a>
              <a
                className="carousel-control-next"
                href="#carouselExampleIndicators"
                role="button"
                data-slide="next"
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span className="sr-only">Next</span>
              </a>
            </div>
          </div>
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
