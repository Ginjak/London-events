import React from "react";
import "./multipleslider.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { imageSizeApi } from "../../eventsActions/utilityFunctions";

const CustomPrevArrow = (props) => {
  const { onClick } = props;
  return (
    <button className="custom-prev-arrow" onClick={onClick}>
      <i className="fa-solid fa-chevron-left"></i>
    </button>
  );
};

const CustomNextArrow = (props) => {
  const { onClick } = props;
  return (
    <button className="custom-next-arrow" onClick={onClick}>
      <i className="fa-solid fa-chevron-right"></i>
    </button>
  );
};

const MultipleSlider = ({ popularEvents }) => {
  const settings = {
    dots: false,
    infinite: true,
    // speed: 2000,
    slidesToShow: 7,
    // slidesToScroll: 0,
    cssEase: "linear",
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
  };

  return (
    <div>
      {popularEvents && (
        <Slider {...settings} className="text-white position-relative">
          {popularEvents.slice(0, 10).map((event) => (
            <div className="card-event-wraper" key={event.id}>
              <div className="img-card-wraper position-relative">
                <img
                  src={imageSizeApi(event.images, 700)}
                  alt={`Artist - ${event.name} image`}
                />
              </div>
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
};

export default MultipleSlider;
