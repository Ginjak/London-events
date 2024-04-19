import React, { useState } from "react";
import "./eventsresultscards.css";
import { imageSizeApi } from "../../eventsActions/utilityFunctions";
import { Link } from "react-router-dom";

const EventsResultsCards = ({ events, loadMore, renderEvents, getEventId }) => {
  return (
    <>
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
    </>
  );
};

export default EventsResultsCards;
