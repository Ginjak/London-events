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
      </div>
    </>
  );
};

export default EventsByCategory;
