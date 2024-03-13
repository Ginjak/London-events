import React, { useContext, useEffect, useState } from "react";
import { AllEvents } from "../../context/allEvents";
import "./hero.css";

const Hero = () => {
  const {
    events,
    eventType,
    fetchEvents,
    setEventType,
    fetchEventImage,
    setEventImg,
    eventImg,
  } = useContext(AllEvents);
  const [heroBackground, setHeroBackground] = useState("#ddd");
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMain, setIsLoadingMain] = useState(true);

  useEffect(() => {
    fetchEventImage();
  }, []);

  useEffect(() => {
    if (eventImg && eventImg.length > 0) {
      setHeroBackground(eventImg[0].images[6].url);
      setIsLoadingMain(false); // Data fetching is complete
      setIsLoading(false); // Data fetching is complete
    }
  }, [eventImg]); // Run this effect whenever eventImg changes

  const handleClick = async () => {
    setIsLoading(true); // Set loading state to true before fetching new data
    try {
      await fetchEvents(); // Wait for data fetching
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false); // Set loading state to false after data is fetched, regardless of success or failure
    }
  };

  const heroStyle = {
    background: `url(${heroBackground})`,
  };

  return (
    <>
      {isLoadingMain && (
        <div className="loading-wraper">
          <h1>Loading</h1>
        </div>
      )}
      <div className="hero position-relative" style={heroStyle}>
        <div className="container-xxl position-relative">
          <h1 className="bg-warning">Hero Section</h1>
          {isLoading && (
            <div
              className="spinner-grow text-white d-block small-spinner"
              role="status"
            >
              <span className="sr-only"></span>
            </div>
          )}
          {!isLoading && events.length > 0 && (
            <p className="text-white">{events[0].name}</p>
          )}
          <button onClick={handleClick}>Get Data</button>
        </div>
      </div>
    </>
  );
};

export default Hero;
