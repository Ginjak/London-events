import React from "react";
import { useState } from "react";
import "./footer.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState();
  const [emailSent, setEmailSent] = useState(true);

  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  const sliderImgArray = [
    {
      id: 1,
      name: "Four Square",
      imgUrl: "/images/apiLogo/four_square.svg",
      url: "https://docs.foursquare.com/",
    },
    {
      id: 2,
      name: "Lastfm",
      imgUrl: "/images/apiLogo/Lastfm_logo.svg",
      url: "https://www.last.fm/home",
    },
    {
      id: 3,
      name: "Tickemaster",
      imgUrl: "/images/apiLogo/ticketmaster-5.svg",
      url: "https://www.ticketmaster.co.uk/",
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          "form-name": "contact",
          email,
        }).toString(),
      });
      setEmail("");
      setEmailSent(true);
      setTimeout(() => {
        setEmailSent(false);
      }, 4000);
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <div id="footer">
      <div className="container-xxl footer-container">
        <div className="api-data-logo">
          <h5 className="footer-data-title">Information and Data Powered By</h5>
          <div className="slider-wraper">
            <Slider {...settings}>
              {sliderImgArray.map((img) => (
                <Link to={img.url} key={img.id} target="_blank">
                  <img src={img.imgUrl} alt={`${img.name} logo`} />
                </Link>
              ))}
            </Slider>
          </div>
        </div>
        <div className="information-form-wraper  d-flex flex-column justify-content-center align-items-center">
          <div className="info-form pb-3">
            <form
              name="contact"
              method="POST"
              onSubmit={handleSubmit}
              className="row g-0 d-flex "
            >
              <div className="col-auto">
                <input
                  type="email"
                  name="email"
                  className="form-input"
                  placeholder="Your e-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                ></input>
              </div>
              <button className="dates-btn newsletter" type="submit">
                Subscribe!
              </button>
            </form>
            {emailSent && (
              <div className="email-sent-wraper mt-1">
                <p className="email-sent">Thank you for subscribing!</p>
              </div>
            )}
          </div>
          <div className="footer-menu d-flex">
            <Link to="/search" className="menu-item me-3">
              Search
            </Link>
            <div className="footer-divider me-3"></div>
            <Link to="/contact" className="menu-item">
              Contact
            </Link>
          </div>
        </div>
      </div>
      <div className="copyrigth text-center py-2">
        &copy; {currentYear} LiveGigUk. All rights reserved.
      </div>
    </div>
  );
};

export default Footer;
