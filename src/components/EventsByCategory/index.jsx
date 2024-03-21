import React from "react";
import "./eventsbycategory.css";

const EventsByCategory = () => {
  return (
    <>
      <div className="container-xxl py-5">
        <h2 className="white mb-4">Choose a Category</h2>
        <div className="event-category-wraper d-flex flex-sm-row mb-5 flex-wrap flex-sm-no-wrap justify-content-center justify-content-sm-start">
          <button className="event-category event-film d-flex flex-column justify-content-center align-items-center ">
            Film
          </button>
          <button className="event-category event-comedy d-flex flex-column justify-content-center align-items-center">
            <span className="comedy-txt">Comedy</span>
          </button>
          <button className="event-category event-music d-flex flex-column justify-content-center align-items-center">
            Music
          </button>
          <button className="event-category event-sports d-flex flex-column justify-content-center align-items-center">
            <span className="sports-txt">Sports</span>
          </button>
          <button className="event-category category-theater d-flex flex-column justify-content-center align-items-center">
            <span className="theater-txt">Theater</span>
          </button>
          <button className="event-category category-family d-flex flex-column justify-content-center align-items-center">
            Family
          </button>
        </div>
        <div className="row cards-wraper row-cols-1 row-cols-lg-2 g-3">
          <div className="col">
            <div className="custom-card row g-0">
              <div className="overlay"></div>
              <div className="date-location-wraper col-12 col-sm-3 d-flex flex-sm-column justify-content-between">
                <div className="date position-relative mb-3">
                  <p className="m-0">Mar</p>
                  <p className="m-0">20</p>
                </div>

                <div className="time-location-wraper position-relative ">
                  <p className="card-info">London</p>
                  <p className="card-info">02 Arena aasdasd asd asd asasda</p>
                  <p className="card-info">19:30</p>
                </div>
              </div>
              <div className="title-wraper col-12 col-sm-9 overflow-hidden position-relative">
                <div className="card-title position-relative d-flex justify-content-center align-items-center h-100">
                  <h3 className="text-center">Event name name eventasdasd</h3>
                </div>
                <div className="card-title-hover text-center">
                  <h3>Event name name eventasdasd</h3>
                </div>
                <div className="price-bubble d-flex">
                  <div className="event-date d-flex flex-column justify-content-center align-items-center">
                    <p className="text-center m-0 price">£10.00</p>
                  </div>
                  <div className="event-date event-time d-flex flex-column justify-content-center align-items-center">
                    <p className="text-center m-0">GBP</p>
                  </div>
                </div>
                <div className="more-info-hover">
                  <div className="card-more-info d-flex flex-row align-items-center">
                    <i className="fa-solid fa-play"></i>
                    <p className="text m-0 ">More Details</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="custom-card row g-0">
              <div className="overlay"></div>
              <div className="col-3 h-100 d-flex flex-column justify-content-between">
                <div className="date position-relative mb-3">
                  <p className="m-0">Mar</p>
                  <p className="m-0">20</p>
                </div>

                <div className="time-location-wraper position-relative ">
                  <p className="card-info">London</p>
                  <p className="card-info">02 Arena</p>
                  <p className="card-info">19:30</p>
                </div>
              </div>
              <div className="col-9 overflow-hidden position-relative">
                <div className="card-title position-relative d-flex justify-content-center align-items-center h-100">
                  <h3>Event name name eventasdasd</h3>
                </div>
                <div className="card-title-hover text-center">
                  <h3>Event name name eventasdasd</h3>
                </div>
                <div className="price-bubble d-flex">
                  <div className="event-date d-flex flex-column justify-content-center align-items-center">
                    <p className="text-center m-0 price">£10.00</p>
                  </div>
                  <div className="event-date event-time d-flex flex-column justify-content-center align-items-center">
                    <p className="text-center m-0">GBP</p>
                  </div>
                </div>
                <div className="more-info-hover">
                  <div className="card-more-info d-flex flex-row align-items-center">
                    <i className="fa-solid fa-play"></i>
                    <p className="text m-0 ">More Details</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="custom-card row g-0">
              <div className="overlay"></div>
              <div className="col-3 h-100 d-flex flex-column justify-content-between">
                <div className="date position-relative mb-3">
                  <p className="m-0">Mar</p>
                  <p className="m-0">20</p>
                </div>

                <div className="time-location-wraper position-relative ">
                  <p className="card-info">London</p>
                  <p className="card-info">02 Arena</p>
                  <p className="card-info">19:30</p>
                </div>
              </div>
              <div className="col-9 overflow-hidden position-relative">
                <div className="card-title position-relative d-flex justify-content-center align-items-center h-100">
                  <h3>Event name name eventasdasd</h3>
                </div>
                <div className="card-title-hover text-center">
                  <h3>Event name name eventasdasd</h3>
                </div>
                <div className="price-bubble d-flex">
                  <div className="event-date d-flex flex-column justify-content-center align-items-center">
                    <p className="text-center m-0 price">£10.00</p>
                  </div>
                  <div className="event-date event-time d-flex flex-column justify-content-center align-items-center">
                    <p className="text-center m-0">GBP</p>
                  </div>
                </div>
                <div className="more-info-hover">
                  <div className="card-more-info d-flex flex-row align-items-center">
                    <i className="fa-solid fa-play"></i>
                    <p className="text m-0 ">More Details</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="custom-card">
              <div className="title">
                <p>Test</p>
              </div>
              <div className="time">
                <p>Time</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EventsByCategory;
