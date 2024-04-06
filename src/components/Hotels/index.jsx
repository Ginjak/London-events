import React from "react";
import "./hotels.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Hotels = ({ data }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3, // Show 3 slides at once
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
  };
  return data && data.results && data.results.length > 0 ? (
    <>
      <div className="test text-white">asdasd{data.results[0].name}</div>
      <div className="test text-white">asdasd{data.results[0].name}</div>

      <div>
        <h2>Carousel</h2>
        <Slider {...settings}>
          <div>
            <h3>Slide 1</h3>
            <p>Content of slide 1</p>
          </div>
          <div>
            <h3>Slide 2</h3>
            <p>Content of slide 2</p>
          </div>
          <div>
            <h3>Slide 3</h3>
            <p>Content of slide 3</p>
          </div>
          {/* Add more slides here */}
        </Slider>
      </div>
    </>
  ) : (
    <p>No hotel data available</p>
  );
};

export default Hotels;
