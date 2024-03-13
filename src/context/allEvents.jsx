import React, { createContext, useState } from "react";
import axios from "axios";

export const AllEvents = createContext();
export const EventsProvider = ({ children }) => {
  const [events, setEvents] = useState([]);
  const [eventType, setEventType] = useState("film");
  const fetchEvents = async () => {
    try {
      const apiUrl = "https://app.ticketmaster.com/discovery/v2/events.json";
      const API_KEY = process.env.REACT_APP_API_KEY;
      const response = await axios.get(apiUrl, {
        params: {
          apikey: API_KEY,
          eventType: eventType,
        },
      });
      setEvents(response.data._embedded.events);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  return (
    <AllEvents.Provider
      value={{ events, eventType, fetchEvents, setEventType }}
    >
      {children}
    </AllEvents.Provider>
  );
};
