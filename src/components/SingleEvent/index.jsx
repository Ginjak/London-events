import React, { useEffect, useState } from "react";
import "./singleevent.css";
import { Link, useParams } from "react-router-dom";
import { eventById } from "../../eventsActions/eventsActions";
import { imageSizeApi } from "../../eventsActions/utilityFunctions";
import axios from "axios";

const SingleEvent = () => {
  const { eventId } = useParams();
  const [eventData, setEventData] = useState(null);
  const [eventBgImg, setEventBgImg] = useState("");
  const latitude = "51.501277";
  const longitude = "-0.177552";

  useEffect(() => {
    const fetchData = async () => {
      try {
        // setIsLoading(true);
        const data = await eventById(eventId);
        setEventData(data);
        // setIsLoading(false);

        setEventBgImg(imageSizeApi(data.images, 700));
        console.log("Search by ID data:", data);
        // console.log("display events value:", displayEvents);
        // console.log("Render events: " + renderEvents);
      } catch (error) {
        console.error(`Test ${error}`);
        // setEvents([]);
      } finally {
        // setIsLoading(false);
      }
    };

    // Call fetchData when formCity changes
    fetchData();
    // setDatesSelected(false);
  }, [eventId]);

  // Render loading indicator while fetching data
  if (!eventData) {
    return <div className="text-white">Loading...</div>;
  }

  // Once data is fetched, render event details
  return (
    <div className="container-xxl py-5">
      <div className="text-dark">
        <div className="row single-event-card">
          <div className="col-lg-6 px-0">
            <div
              className="text-time-title-wraper position-relative px-4 py-3 d-flex justify-content-center align-items-center"
              style={{ backgroundImage: `url(${eventBgImg})` }}
            >
              <div className="overlay"></div>
              <div className="event-date d-flex flex-column justify-content-center align-items-center">
                <p className="m-0">
                  {new Date(eventData.dates.start.dateTime).toLocaleString(
                    "default",
                    {
                      month: "short",
                    }
                  )}
                </p>
                <p className="m-0">
                  {new Date(eventData.dates.start.dateTime)
                    .getDate()
                    .toString()
                    .padStart(2, "0")}
                </p>
              </div>
              <div className="time-location-wraper">
                <p className="card-info mb-0 position-relative">
                  {eventData.dates.start.localTime
                    .split(":")
                    .slice(0, 2)
                    .join(":")}
                </p>
              </div>
              <h3 className="single-event-title text-white mb-0">
                {eventData.name}
              </h3>
            </div>
            <div className="event-details-wraper px-4 py-3 ">
              <div className="genre-price-venue d-flex justify-content-between">
                <div className="genre-price-tickets d-flex flex-column justify-content-between">
                  <div className="genre-price">
                    {eventData?.classifications?.[0] && (
                      <p className="details-genre mb-4 mb-sm-1">
                        {eventData.classifications[0].genre.name}
                      </p>
                    )}
                  </div>
                  {eventData?.url && (
                    <div className="tickets-btn-wraper mb-0">
                      {eventData?.priceRanges?.[0] && (
                        <p className="price-from mb-2 mb-sm-1">
                          From £<span>{eventData?.priceRanges[0]?.min}</span>
                        </p>
                      )}
                      <Link
                        to={eventData?.url}
                        className="dates-btn d-block d-sm-inline-block text-center text-sm-start"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Get Tickets!
                      </Link>
                    </div>
                  )}
                </div>

                {eventData?._embedded?.venues && (
                  <div className="venue-info d-flex flex-column ">
                    <p className="text-end mb-1 venue-name">
                      {eventData?._embedded?.venues[0].name}
                    </p>
                    <p className="text-end mb-1 venue-address">
                      {eventData?._embedded?.venues[0]?.address?.line1}
                    </p>
                    <p className="text-end mb-1 venue-address">
                      {eventData?._embedded?.venues[0]?.postalCode}
                    </p>
                    <p className="text-end mb-1 venue-address">
                      {eventData?._embedded?.venues[0]?.city?.name}
                    </p>
                    <Link
                      className="text-end directions mt-3"
                      to={`https://www.google.com/maps/dir/Current+Location/${eventData?._embedded?.venues[0]?.location?.latitude},${eventData?._embedded?.venues[0]?.location?.longitude}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fa-solid fa-location-dot me-2"></i>
                      Directions
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="col-lg-6">asdas</div>
        </div>
      </div>
    </div>
  );
};

export default SingleEvent;
