// Hero.js
import React, { useState, useEffect } from "react";
import "./hero.css";
import { useFormCity } from "../../context/CityContext";
import { fetchEvents } from "../../eventsActions/eventsActions";
import {
  generateRandomNumber,
  imageSizeApi,
} from "../../eventsActions/utilityFunctions";

const Hero = () => {
  // Use the useFormCity hook to access formCity value
  const { formCity } = useFormCity();

  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [heroBg, setHeroBg] = useState("");
  const [eventName, setEventName] = useState("");
  const [eventCity, setEventCity] = useState("");
  const [eventDate, setEventDate] = useState("");

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
          setEventCity(data[rndNumber].city);
          setEventDate(data[rndNumber].date);
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
          <h1 className="text-white">Test</h1>
          {/* Render event details */}
          <p>{eventName}</p>
          <p>{eventCity}</p>
          <p>{eventDate}</p>
        </div>
      </div>
    </>
  );
};

export default Hero;
