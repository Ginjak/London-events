import React, { useState, useEffect } from "react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import "./eventsbycategory.css";
import { useFormCity } from "../../context/CityContext";
import {
  fetchEvents,
  futureDayForApi,
  startDateForApi,
} from "../../eventsActions/eventsActions";

const EventsByCategory = () => {
  const { formCity } = useFormCity();
  const [events, setEvents] = useState([]);
  const [category, setCategory] = useState("KnvZfZ7vAeA");
  const [isLoading, setIsLoading] = useState(true);
  const [showCalendar, setShowCalendar] = useState(false);
  const [datesSelected, setDatesSelected] = useState(false);
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(new Date().setDate(new Date().getDate() + 60)),
      key: "selection",
    },
  ]);
  console.log("Date range:", dateRange);
  console.log(startDateForApi(futureDayForApi(25)));
  const handleButtonClick = () => {
    setShowCalendar(true);
  };

  const handleSubmit = () => {
    // Here you can handle the submission of selected dates
    // For example, you can fetch events based on the selected date range
    console.log("Selected date range:", dateRange);
    setShowCalendar(false);
    setDatesSelected(true);
  };

  const handleCancel = () => {
    setShowCalendar(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true); // Set isLoading to true when fetching data
        const data = await fetchEvents(
          undefined,
          formCity,
          startDateForApi(dateRange[0].startDate),
          startDateForApi(dateRange[0].endDate),
          category,
          50
        );
        setEvents(data);
        setIsLoading(false);

        console.log("Button Events loaded:", data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false); // Set isLoading to false after data is fetched
      }
    };

    // Call fetchData when formCity changes
    fetchData();
    setDatesSelected(false);
  }, [formCity, category, datesSelected]);

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
    console.log("Selected category:", event.target.value);
  };

  return (
    <>
      <div className="container-xxl py-5">
        <div>
          <button onClick={handleButtonClick}>Select Dates</button>
          {showCalendar && (
            <div className="calendar-modal">
              <DateRange
                editableDateInputs={true}
                onChange={(item) => setDateRange([item.selection])}
                moveRangeOnFirstSelection={false}
                ranges={dateRange}
              />
              <button onClick={handleSubmit}>Submit</button>
              <button onClick={handleCancel}>Cancel</button>
            </div>
          )}
        </div>
        <h2 className="white mb-4">Choose a Category</h2>
        <div className="event-category-wraper d-flex flex-sm-row mb-5 flex-wrap flex-sm-no-wrap justify-content-center justify-content-sm-start">
          <input
            type="radio"
            className="film-check d-none"
            name="category"
            id="jazz"
            value="KnvZfZ7vAvE"
            autoComplete="off"
            onChange={handleCategoryChange}
          />
          <label
            className="event-category event-film d-flex flex-column justify-content-center align-items-center"
            htmlFor="jazz"
          >
            Jazz
          </label>
          <input
            type="radio"
            className="comedy-check d-none"
            name="category"
            value="KnvZfZ7vAeA"
            id="rock"
            autoComplete="off"
            checked={category === "KnvZfZ7vAeA"}
            onChange={handleCategoryChange}
          />
          <label
            className="event-category event-comedy d-flex flex-column justify-content-center align-items-center"
            htmlFor="rock"
          >
            Rock
          </label>

          <input
            type="radio"
            className="music-check d-none"
            name="category"
            value="KnvZfZ7vAvt"
            id="metal"
            autoComplete="off"
            onChange={handleCategoryChange}
          />
          <label
            className="event-category event-music d-flex flex-column justify-content-center align-items-center"
            htmlFor="metal"
          >
            Metal
          </label>
          <input
            type="radio"
            className="sports-check d-none"
            name="category"
            value="KnvZfZ7vAv1"
            id="hip-hop"
            autoComplete="off"
            onChange={handleCategoryChange}
          />
          <label
            className="event-category event-sports d-flex flex-column justify-content-center align-items-center"
            htmlFor="hip-hop"
          >
            Hip-Hop
          </label>
          <input
            type="radio"
            className="theater-check d-none"
            name="category"
            value="KnvZfZ7vAvF"
            id="dance"
            autoComplete="off"
            onChange={handleCategoryChange}
          />
          <label
            className="event-category category-theater d-flex flex-column justify-content-center align-items-center"
            htmlFor="dance"
          >
            Dance
          </label>
          <input
            type="radio"
            className="family-check d-none"
            name="category"
            value="KnvZfZ7vAev"
            id="pop"
            autoComplete="off"
            onChange={handleCategoryChange}
          />
          <label
            className="event-category category-family d-flex flex-column justify-content-center align-items-center"
            htmlFor="pop"
          >
            Pop
          </label>
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
