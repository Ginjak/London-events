import React from "react";
import "./footer.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Footer = () => {
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

  return (
    <div id="footer">
      <div className="container-xxl footer-container">
        <div className="api-data-logo">
          <h5>Information and Data Powered By</h5>
          <div className="slider-wraper">
            <Slider {...settings}>
              {sliderImgArray.map((img) => (
                <a href={img.url} key={img.id} target="_blank">
                  <img src={img.imgUrl} alt={`${img.name} logo`} />
                </a>
              ))}
            </Slider>
          </div>
        </div>
        <div className="information-form-wraper  d-flex justify-content-center align-items-center">
          <div className="info-form pb-5">
            <form action="" className="row g-0 d-flex ">
              <div className="col-auto">
                <input
                  type="text"
                  className="form-input"
                  placeholder="Your e-mail"
                ></input>
              </div>
              <button className="dates-btn newsletter" type="submit">
                Subscribe!
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
