import React, { useState } from "react";
import "./establishmenttab.css";
import Hotels from "../Hotels";

const EstablishmentTab = ({ hotelsTab, restaurantTab }) => {
  const [activeTab, setActiveTab] = useState("hotel-tab");

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };

  return (
    <div className="hotel-restaurant-tabs-wraper">
      <h2 className="establishments-title mb-4">
        Nearby accommodations and dining options
      </h2>
      <ul className="nav mb-3" id="hotels-restaurants-tab" role="tablist">
        <li className="nav-item" role="presentation">
          <button
            className={`nav-link dates-btn me-3 ${
              activeTab === "hotel-tab" ? "active" : ""
            }`}
            id="hotels-tab"
            onClick={() => handleTabChange("hotel-tab")}
          >
            Hotels
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button
            className={`nav-link dates-btn ${
              activeTab === "restaurant-tab" ? "active" : ""
            }`}
            id="restaurants-tab"
            onClick={() => handleTabChange("restaurant-tab")}
          >
            Restaurants
          </button>
        </li>
      </ul>
      <div className="tab-content" id="establishments-content">
        <div
          className={`tab-pane fade ${
            activeTab === "hotel-tab" ? "show active" : ""
          } text-white`}
          id="hotel-tab"
        >
          {activeTab === "hotel-tab" && <Hotels data={hotelsTab} />}
        </div>
        <div
          className={`tab-pane fade ${
            activeTab === "restaurant-tab" ? "show active" : ""
          } text-white`}
          id="restaurant-tab"
        >
          {activeTab === "restaurant-tab" && (
            <Hotels data={restaurantTab} bgImage="Restaurants" />
          )}
        </div>
      </div>
    </div>
  );
};

export default EstablishmentTab;
