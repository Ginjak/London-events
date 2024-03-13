import React, { useContext, useEffect } from "react";
import { AllEvents } from "../../context/allEvents";

const Hero = () => {
  const { events, eventType, fetchEvents, setEventType } =
    useContext(AllEvents);

  useEffect(() => {
    console.log(events);
  }, [events]);

  const handleClick = () => {
    fetchEvents();
  };
  return (
    <>
      <h1 className="bg-warning">Hero Section</h1>
      {events.length > 0 && <p>{events[0].name}</p>}
      <button onClick={handleClick}>Get Data</button>
    </>
  );
};

export default Hero;
