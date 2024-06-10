import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { scroller } from "react-scroll";
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

const MultipleSlider = ({ popularEvents, title }) => {
  const navigate = useNavigate();
  const handleEventUpdate = (updatedEventId) => {
    navigate(`/event/${updatedEventId}`);
  };

  const scrollToElement = () => {
    scroller.scrollTo("single-event", {
      duration: 500,
      delay: 0,
      smooth: true,
    });
  };

  const [loading, setLoading] = useState(true);
  const handleImageLoad = () => {
    setLoading(false);
  };

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
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 580,
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
    <>
      <div className="multislider-wraper postion-relative py-3 py-md-5">
        {loading && (
          <>
            <div className="container-xxl">
              <div className="multislider-placeholder placeholder-glow  title mb-4">
                <span className="placeholder bg-white col-5"></span>
              </div>
            </div>
            <div className="multislider-placeholder-card-wraper d-flex">
              {Array.from({ length: 5 }, (_, index) => (
                <div
                  className={`multislider-placeholder-card placeholder-${index} d-flex flex-column justify-content-between`}
                  key={index}
                >
                  <h5 className="multislider-placeholder-title placeholder-glow px-3 mt-3">
                    <span className="placeholder bg-white col-12"></span>
                  </h5>
                  <div className="multislider-placeholder-genre-wraper">
                    <p className="card-text placeholder-glow d-flex align-items-center h-100 ps-3">
                      <span className="placeholder bg-white col-6"></span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {popularEvents && (
          <>
            {title && (
              <div className="container-xxl">
                <h2 className="multislider-title text-center text-sm-start mb-4">
                  {title}
                </h2>
              </div>
            )}

            <Slider
              {...settings}
              className=" multislider text-white position-relative "
            >
              {popularEvents.slice(0, 20).map((event) => (
                <div
                  className="card-event-wraper overflow-hidden "
                  key={event.id}
                  onClick={() => {
                    handleEventUpdate(event.id);
                    scrollToElement();
                  }}
                >
                  <div className="img-card-wraper position-relative ">
                    <div className="overlay"></div>
                    <img
                      src={imageSizeApi(event?.images, 350)}
                      alt={`Artist - ${event?.name} image`}
                      className="card-event-img"
                      onLoad={handleImageLoad}
                    />
                    <h5 className="event-card-title px-2">{event?.name}</h5>
                    <div className="event-card-genre-wraper d-flex justify-content-between">
                      <p className="event-card-genre m-0">
                        {event?.classifications?.[0].genre?.name !== "Undefined"
                          ? event?.classifications?.[0].genre?.name
                          : event?.classifications?.[0].segment?.name}
                      </p>
                    </div>
                    <div className="event-card-details-wraper d-flex justify-content-between">
                      <div className="event-date-wraper d-flex flex-column justify-content-center align-items-center">
                        <p className="m-0">
                          {new Date(
                            event?.dates?.start?.dateTime
                          ).toLocaleString("default", {
                            month: "short",
                          })}
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
                          {event?.dates?.start?.localTime
                            ?.split(":")
                            .slice(0, 2)
                            .join(":")}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </>
        )}
      </div>
    </>
  );
};

export default MultipleSlider;
