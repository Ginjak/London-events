import React, { useState } from "react";
import "./search.css";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

const Search = () => {
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(new Date().setDate(new Date().getDate() + 60)),
      key: "selection",
    },
  ]);
  return (
    <>
      <div id="search-page">
        <div className="hero-wraper position-relative">
          <div className="search-hero container-xxl d-flex justify-content-center align-items-center">
            <div className="form-wraper position-relative d-flex">
              <form className="position-relative">
                <input
                  className="py-2 px-4"
                  type="text"
                  placeholder="Search for event..."
                />
                <button className="search-submit-btn" type="submit">
                  <i className="fa-solid fa-magnifying-glass"></i>
                </button>
              </form>
            </div>
            {/* <DateRange
            editableDateInputs={true}
            onChange={(item) => setDateRange([item.selection])}
            moveRangeOnFirstSelection={false}
            ranges={dateRange}
          /> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Search;
