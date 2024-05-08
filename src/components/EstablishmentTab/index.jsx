import React, { useState } from "react";
import "./establishmenttab.css";
import Hotels from "../Hotels";

const EstablishmentTab = ({ hotelsTab, restaurantTab, hotelLoading }) => {
  const [activeTab, setActiveTab] = useState("hotel-tab");

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };
  console.log("hotel loading status ", hotelLoading);
  return (
    <>
      {hotelLoading ? (
        <div className="establishments-placeholder placeholder-glow">
          <span className="placeholder-title placeholder col-12 bg-light"></span>
          <div className="placeholder-btn btn-light btn disabled placeholder col-2 d-inline-block me-3"></div>
          <div className="placeholder-btn btn-light btn disabled placeholder col-2 d-inline-block"></div>

          <div className="mt-2 row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
            <div className="col d-none d-lg-block">
              <div className="card" aria-hidden="true">
                <div className="card-img-placeholder col-12 placeholder"></div>
                <div className="card-body">
                  <h5 className="card-title placeholder-glow">
                    <span className="placeholder col-6 bg-light"></span>
                  </h5>
                  <p className="card-text placeholder-glow ">
                    <span className="placeholder col-3 bg-light "></span>
                  </p>
                  <div className="d-flex justify-content-end">
                    <div className="placeholder-btn btn-light btn disabled placeholder col-5"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col d-none d-md-block">
              <div className="card" aria-hidden="true">
                <div className="card-img-placeholder col-12 placeholder"></div>
                <div className="card-body">
                  <h5 className="card-title placeholder-glow">
                    <span className="placeholder col-6 bg-light"></span>
                  </h5>
                  <p className="card-text placeholder-glow ">
                    <span className="placeholder col-3 bg-light "></span>
                  </p>
                  <div className="d-flex justify-content-end">
                    <div className="placeholder-btn btn-light btn disabled placeholder col-5"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card" aria-hidden="true">
                <div className="card-img-placeholder col-12 placeholder"></div>
                <div className="card-body">
                  <h5 className="card-title placeholder-glow">
                    <span className="placeholder col-6 bg-light"></span>
                  </h5>
                  <p className="card-text placeholder-glow ">
                    <span className="placeholder col-3 bg-light "></span>
                  </p>
                  <div className="d-flex justify-content-end">
                    <div className="placeholder-btn btn-light btn disabled placeholder col-5"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="hotel-restaurant-tabs-wraper">
          <h2 className="establishments-title mb-4 text-center text-sm-start">
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
      )}
    </>
  );
};

export default EstablishmentTab;
