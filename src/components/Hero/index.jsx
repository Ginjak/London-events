import React, { useState, useEffect } from "react";
import "./hero.css";
import { fetchEvents } from "../../eventsActions/eventsActions";
import {
  generateRandomNumber,
  imageSizeApi,
} from "../../eventsActions/utilityFunctions";
const Hero = () => {
  // useState
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [heroBg, setHeroBg] = useState("");
  const [eventName, setEventName] = useState("");
  const [eventCity, setEventCity] = useState("");
  const [eventDate, setEventDate] = useState("");

  // Function to get default API data and set it to events
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchEvents();
        setEvents(data);
        setIsLoading(false);

        if (data.length > 0) {
          const rndNumber = generateRandomNumber(data.length);
          setHeroBg(imageSizeApi(data[rndNumber].images, 1135));
          setEventName(data[rndNumber].name);
          setEventCity(data[rndNumber].city); // Example of updating other state variables
          setEventDate(data[rndNumber].date); // Example of updating other state variables
        }
      } catch (error) {
        console.error(error);
      }
    };

    if (events.length === 0) {
      fetchData();
    }
  }, [events]);

  const heroBgUrl = {
    background: `url(${heroBg})`,
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
        <div className="container-xxl position-relative">
          <h1 className="text-white">TEst</h1>
        </div>
      </div>
    </>
  );
};

export default Hero;
