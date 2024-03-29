import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import "./eventsbycategory.css";
import { useFormCity } from "../../context/CityContext";
import { useEventId } from "../../context/EventIdContext";
import {
  fetchEvents,
  startDateForApi,
  endDateForApi,
} from "../../eventsActions/eventsActions";
import { imageSizeApi } from "../../eventsActions/utilityFunctions";

const EventsByCategory = () => {
  const { formCity } = useFormCity();
  const { eventId, setEventId } = useEventId();
  const [events, setEvents] = useState([]);
  const [category, setCategory] = useState("KnvZfZ7vAeA");
  const [isLoading, setIsLoading] = useState(true);
  const [showCalendar, setShowCalendar] = useState(false);
  const [datesSelected, setDatesSelected] = useState(false);
  const [showElement, setShowElement] = useState("hidden-main");
  const [displayEvents, setDisplayEvents] = useState(20);
  const [renderEvents, setRenderEvents] = useState(8);
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(new Date().setDate(new Date().getDate() + 60)),
      key: "selection",
    },
  ]);

  const handleButtonClick = () => {
    setShowCalendar(true);
    setShowElement("show-main");
  };

  const handleSubmit = () => {
    console.log("Selected date range:", dateRange);
    setShowCalendar(false);
    setDatesSelected(true);
    setDisplayEvents(20);
    setRenderEvents(8);
    setShowElement("hidden-main");
  };

  const handleCancel = () => {
    setShowCalendar(false);
    setShowElement("hidden-main");
  };

  const loadMore = () => {
    setDisplayEvents(displayEvents + 8);
    setRenderEvents(renderEvents + 8);
    console.log("display events value:", displayEvents);
  };

  const getEventId = (eventId) => {
    setEventId(eventId);
    console.log("This is event id: ", eventId);
  };
  // Background image for card

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const data = await fetchEvents(
          undefined,
          formCity,
          startDateForApi(dateRange[0].startDate),
          endDateForApi(dateRange[0].endDate),
          category,
          displayEvents
        );
        setEvents(data);
        setIsLoading(false);

        console.log("Button Events loaded:", data);
        console.log("display events value:", displayEvents);
        console.log("Render events: " + renderEvents);
      } catch (error) {
        console.error(`Test ${error}`);
        setEvents([]);
      } finally {
        setIsLoading(false); // Set isLoading to false after data is fetched
      }
    };

    // Call fetchData when formCity changes
    fetchData();
    setDatesSelected(false);
  }, [formCity, category, datesSelected, displayEvents, eventId]);

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
    setDisplayEvents(20);
    setRenderEvents(8);

    console.log("Selected category:", event.target.value);
  };

  return (
    <>
      <div className="container-xxl py-5">
        <h2 className="white mb-4">Choose a Category</h2>
        <div className="calendar-wraper mb-4">
          <button className="dates-btn me-2 mb-2" onClick={handleButtonClick}>
            <i className="fa-solid fa-calendar-days me-3"></i>Select Dates
          </button>
          <div className="dates-submit-cancel-wraper mb-2">
            <button
              className={"dates-btn dates-submit me-2 " + showElement}
              onClick={handleSubmit}
            >
              Submit
            </button>
            <button
              className={"dates-btn dates-cancel " + showElement}
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
          {showCalendar && (
            <div className="calendar-modal">
              <DateRange
                editableDateInputs={true}
                onChange={(item) => setDateRange([item.selection])}
                moveRangeOnFirstSelection={false}
                ranges={dateRange}
              />
            </div>
          )}
        </div>

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
        {events && events.length > 0 ? (
          <div className="row cards-wraper row-cols-1 row-cols-lg-2 g-3">
            {events?.slice(0, renderEvents).map((event, index) => (
              <div className="col" key={event.id}>
                <div
                  className="custom-card row g-0"
                  style={{
                    backgroundImage: `url(${imageSizeApi(event.images, 900)})`,
                  }}
                >
                  <div className="overlay"></div>
                  <div className="date-location-wraper col-12 col-sm-3 d-flex flex-sm-column justify-content-between">
                    <div className="date position-relative mb-3">
                      <p className="m-0">
                        {new Date(event.dates.start.dateTime).toLocaleString(
                          "default",
                          {
                            month: "short",
                          }
                        )}
                      </p>
                      <p className="m-0">
                        {new Date(event.dates.start.dateTime)
                          .getDate()
                          .toString()
                          .padStart(2, "0")}
                      </p>
                    </div>

                    <div className="time-location-wraper position-relative ">
                      <p className="card-info">
                        {event._embedded.venues[0].city.name}
                      </p>
                      <p className="card-info">
                        {event._embedded.venues[0].name}
                      </p>
                      <p className="card-info">
                        {event.dates.start.localTime
                          .split(":")
                          .slice(0, 2)
                          .join(":")}
                      </p>
                    </div>
                  </div>
                  <div className="title-wraper col-12 col-sm-9 overflow-hidden position-relative">
                    <div className="card-title position-relative d-flex justify-content-center align-items-center h-100">
                      <h3 className="text-center">{event.name}</h3>
                    </div>
                    <div className="card-title-hover text-center">
                      <h3>{event.name}</h3>
                    </div>
                    {event?.priceRanges &&
                      event?.priceRanges[0]?.min !== 0 &&
                      !isNaN(event?.priceRanges[0]?.min) && (
                        <div className="price-bubble d-flex">
                          <div className="event-date d-flex flex-column justify-content-center align-items-center">
                            <p className="text-center m-0 price">
                              {"£" + Math.floor(event?.priceRanges[0]?.min)}
                            </p>
                          </div>
                          <div className="event-date event-time d-flex flex-column justify-content-center align-items-center">
                            <p className="text-center m-0">GBP</p>
                          </div>
                        </div>
                      )}

                    <div className="more-info-hover">
                      <Link
                        onClick={() => getEventId(event.id)}
                        to={`/event/${event.id}`}
                        className="card-more-info d-flex flex-row align-items-center"
                      >
                        <i className="fa-solid fa-play"></i>
                        <p className="text m-0 ">More Details</p>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-events-wraper text-center my-5 d-flex flex-column justify-content-center align-items-center position relative">
            <img className="no-events-img" src="/images/no_events.png" />
            <p className="no-events-txt mb-0">Apologies, no events found.</p>
            <p className="no-events-txt mb-0">
              Please choose different dates or music genre.
            </p>
          </div>
        )}
        {events.length > renderEvents && (
          <div className="load-more-wraper text-center my-4">
            <button className="dates-btn" onClick={loadMore}>
              Load More
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default EventsByCategory;
