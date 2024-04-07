import React from "react";
import "./establishmenttab.css";
import Hotels from "../Hotels";

const EstablishmentTab = ({ hotelsTab, restaurantTab }) => {
  return (
    <div className="hotel-restaurant-tabs-wraper">
      <h2 className="establishments-title mb-4">
        Nearby accommodations and dining options
      </h2>
      <ul className="nav mb-3" id="hotels-restaurants-tab" role="tablist">
        <li className="nav-item" role="presentation">
          <button
            className="nav-link active dates-btn me-3"
            id="hotels-tab"
            data-bs-toggle="tab"
            data-bs-target="#hotel-tab"
            type="button"
            role="tab"
            aria-controls="hotels"
            aria-selected="true"
          >
            Hotels
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button
            className="nav-link dates-btn"
            id="restaurants-tab"
            data-bs-toggle="tab"
            data-bs-target="#restaurant-tab"
            type="button"
            role="tab"
            aria-controls="restaurants"
            aria-selected="false"
          >
            Restaurants
          </button>
        </li>
      </ul>
      <div className="tab-content" id="establishments-content">
        <div
          className="tab-pane fade show active text-white"
          id="hotel-tab"
          role="tabpanel"
          aria-labelledby="hotels-tab"
        >
          <Hotels data={hotelsTab} />
        </div>
        <div
          className="tab-pane fade text-white"
          id="restaurant-tab"
          role="tabpanel"
          aria-labelledby="restaurants-tab"
        >
          <Hotels data={restaurantTab} bgImage="Restaurants" />
        </div>
      </div>
    </div>
  );
};

export default EstablishmentTab;
