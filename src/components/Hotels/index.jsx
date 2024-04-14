import React from "react";
import { Link } from "react-router-dom";
import "./hotels.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  constructGoogleMapsURL,
  generateRandomNumber,
} from "../../eventsActions/utilityFunctions";

const CustomPrevArrow = (props) => {
  const { onClick } = props;
  return (
    <button className="custom-prev-arrow" onClick={onClick}>
      <i className="fa-solid fa-chevron-left"></i>
    </button>
  );
};

// Custom next arrow component
const CustomNextArrow = (props) => {
  const { onClick } = props;
  return (
    <button className="custom-next-arrow" onClick={onClick}>
      <i className="fa-solid fa-chevron-right"></i>
    </button>
  );
};

const Hotels = ({ data, bgImage = "Hotels" }) => {
  const hotels = data && data.results ? data.results : [];
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000, // Adjust autoplay speed as needed
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
  };

  return data && data.results && data.results.length > 0 ? (
    <>
      <div className="slider-wraper">
        <Slider {...settings} className="text-white position-relative">
          {hotels.map((hotel) => (
            <div key={hotel.fsq_id} className="location-card px-2 ">
              <div
                className="img-container position-relative"
                style={{
                  backgroundImage: `url("${
                    bgImage === "Hotels"
                      ? `/images/hotels/Hotel_${generateRandomNumber(9)}.webp`
                      : bgImage === "Restaurants"
                      ? `/images/restaurants/Restaurant_${generateRandomNumber(
                          9
                        )}.webp`
                      : ""
                  }")`,
                }}
              ></div>
              <div className="title-distance-link-wraper p-3">
                <h5 className="title">{hotel.name}</h5>
                <p className="distance">
                  {(hotel.distance / 1609.34).toFixed(2)} mi from venue
                </p>
                <div className="text-end btn-wraper">
                  <Link
                    className="dates-btn"
                    to={constructGoogleMapsURL(
                      hotel.name,
                      hotel.location.formatted_address
                    )}
                    target="_blank"
                  >
                    More details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </>
  ) : (
    ""
  );
};

export default Hotels;
