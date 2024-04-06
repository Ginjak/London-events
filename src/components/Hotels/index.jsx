import React from "react";
import "./hotels.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const CustomPrevArrow = (props) => {
  const { onClick } = props;
  return <button className="custom-prev-arrow" onClick={onClick}></button>;
};

// Custom next arrow component
const CustomNextArrow = (props) => {
  const { onClick } = props;
  return <button className="custom-next-arrow" onClick={onClick}></button>;
};

const Hotels = ({ data }) => {
  const hotels = data && data.results ? data.results : [];
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3, // Show 3 slides at once
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
  };

  return data && data.results && data.results.length > 0 ? (
    <>
      <div className="slider-wraper">
        <Slider {...settings} className="text-white">
          {hotels.map((hotel) => (
            <div key={hotel.fsq_id} className="hotel-card">
              {hotel.name}
            </div>
          ))}
        </Slider>
      </div>
    </>
  ) : (
    <p>No hotel data available</p>
  );
};

export default Hotels;
