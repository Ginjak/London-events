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
    slidesToShow: 5,
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
            <div className="card-event-wraper overflow-hidden " key={event.id}>
              <div className="img-card-wraper position-relative ">
                <div className="overlay"></div>
                <img
                  src={imageSizeApi(event?.images, 350)}
                  alt={`Artist - ${event?.name} image`}
                  className="card-event-img"
                />
                <h5 className="event-card-title">{event?.name}</h5>
                <div className="event-card-genre-wraper d-flex justify-content-between">
                  <p className="event-card-genre m-0">
                    {event?.classifications?.[0].genre?.name}
                  </p>
                </div>
                <div className="event-card-details-wraper d-flex justify-content-between">
                  <div className="event-date-wraper d-flex flex-column justify-content-center align-items-center">
                    <p className="m-0">
                      {new Date(event?.dates?.start?.dateTime).toLocaleString(
                        "default",
                        {
                          month: "short",
                        }
                      )}
                    </p>
                    <p className="m-0">
                      {new Date(event?.dates?.start?.dateTime)
                        .getDate()
                        .toString()
                        .padStart(2, "0")}
                    </p>
                  </div>
                  <div className="event-card-time-venue-wraper d-flex flex-column justify-content-between">
                    <p className="event-card-venue m-0">
                      {event?._embedded?.venues?.[0].name}
                    </p>
                    <p className="event-card-time text-end m-0">
                      {event.dates.start.localTime
                        .split(":")
                        .slice(0, 2)
                        .join(":")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
};

export default MultipleSlider;
