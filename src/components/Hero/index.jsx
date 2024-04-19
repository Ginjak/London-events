// Hero.js
import React, { useState, useEffect } from "react";
import { Link as ScrollLink } from "react-scroll";
import { Link } from "react-router-dom";
import "./hero.css";
import { useFormCity } from "../../context/CityContext";
import { useEventId } from "../../context/EventIdContext";
import { fetchEvents } from "../../eventsActions/eventsActions";
import {
  generateRandomNumber,
  imageSizeApi,
  extractText,
} from "../../eventsActions/utilityFunctions";

const Hero = () => {
  // Use the useFormCity hook to access formCity value
  const { formCity } = useFormCity();
  const { eventId, setEventId } = useEventId();
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [heroBg, setHeroBg] = useState("");
  const [eventName, setEventName] = useState("");
  const [eventCity, setEventCity] = useState("");
  const [eventVenue, setEventVenue] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [eventGenre, setEventGenre] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true); // Set isLoading to true when fetching data
        const data = await fetchEvents(undefined, formCity);
        setEvents(data);
        if (data.length > 0) {
          const rndNumber = generateRandomNumber(data.length);
          setHeroBg(imageSizeApi(data[rndNumber].images, 1200));
          setEventName(data[rndNumber].name);
          setEventCity(data[rndNumber]._embedded.venues[0].city.name);
          setEventVenue(data[rndNumber]._embedded.venues[0].name);
          setEventDate(data[rndNumber].dates.start.localDate);
          setEventTime(data[rndNumber].dates.start.localTime);
          setEventGenre(data[rndNumber].classifications[0].genre.name);
          setEventId(data[rndNumber].id);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false); // Set isLoading to false after data is fetched
      }
    };

    // Call fetchData when formCity changes
    fetchData();
  }, [formCity]); // Update when formCity changes

  const heroBgUrl = {
    background: `url(${heroBg})`,
  };
  const getEventId = (eventId) => {
    console.log(eventId);
  };
  return (
    <>
      {isLoading && (
        <div className="loading-wraper">
          <div
            className="large-spinner spinner-border text-white"
            role="status"
          >
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
      <div className="hero" style={heroBgUrl}>
        <div className="container-xxl position-relative hero-wraper ">
          <div className="h-100 d-flex flex-column justify-content-center py-5">
            <div className="hero-details-wraper">
              <p className="grey mb-2 mb-md-0">{eventGenre}</p>
              <h1 className="hero-title text-center text-sm-start">
                {extractText(eventName)}
              </h1>
              <div className="event-details-wraper d-flex flex-column flex-sm-row col mt-5">
                <div className="col-12 col-sm-6 col-md-5 col-xl-4 col-xxl-3 d-flex justify-content-center justify-content-sm-start mb-3 mb-sm-0">
                  <div className="event-date d-flex flex-column justify-content-center align-items-center">
                    <p className="text-center m-0">
                      {new Date(eventDate).toLocaleString("default", {
                        month: "short",
                      })}
                    </p>
                    <p className="text-center m-0">
                      {new Date(eventDate)
                        .getDate()
                        .toString()
                        .padStart(2, "0")}
                    </p>
                  </div>
                  <div className="event-date event-time d-flex flex-column justify-content-center align-items-center">
                    <p className="text-center m-0">
                      {eventTime.split(":").slice(0, 2).join(":")}
                    </p>
                  </div>
                  <div className="event-city d-flex flex-column justify-content-center align-items-center">
                    <p className="m-0">{eventVenue}</p>
                  </div>
                </div>
                <div className="ps-3 more-info-wraper white col-12 col-sm-6 col-md-7 col-xl-8 col-xxl-9 start d-flex justify-content-center justify-content-sm-start">
                  <Link
                    onClick={() => getEventId(eventId)}
                    to={`/event/${eventId}`}
                    className="more-info d-flex flex-row align-items-center"
                  >
                    <i className="fa-solid fa-play"></i>
                    <p className="text m-0 ">More Details</p>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="arrow-next-section demo">
            <ScrollLink to="events" smooth={true} duration={100}>
              <span></span>
            </ScrollLink>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
