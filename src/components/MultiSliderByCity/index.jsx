import React, { useState, useEffect } from "react";
import "./multisliderbycity.css";
import MultipleSlider from "../MultipleSlider";
import { fetchEvents } from "../../eventsActions/eventsActions";
import { useFormCity } from "../../context/CityContext";
const MultiSliderByCity = () => {
  const { formCity } = useFormCity();
  const [events, setEvents] = useState("");

  useEffect(() => {
    const eventsData = async () => {
      try {
        const data = await fetchEvents(
          undefined,
          formCity,
          undefined,
          undefined,
          undefined,
          100
        );
        setEvents(data);
        console.log("this is my new data for slider ", data);
      } catch (error) {
        console.error(`Test ${error}`);
      } finally {
      }
    };
    eventsData();
  }, [formCity]);
  return (
    <>
      <MultipleSlider
        popularEvents={events}
        title={`More events ${formCity}`}
      />
    </>
  );
};

export default MultiSliderByCity;
