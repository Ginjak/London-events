import React from "react";
import "./eventsbycategory.css";

const EventsByCategory = () => {
  return (
    <>
      <div className="container-xxl py-5">
        <h2 className="white ">Choose a Category</h2>
        <div className="event-category-wraper d-flex">
          <button className="event-category event-film d-flex flex-column justify-content-center align-items-center">
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
        <div className="row cards-wraper row-cols-1 row-cols-md-2 g-4">
          <div className="col">
            <div className="custom-card row">
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
              <div className="col-9 overflow-hidden">
                <div className="card-title position-relative d-flex justify-content-center align-items-center h-100">
                  <h3>Event name name eventasdasd</h3>
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
