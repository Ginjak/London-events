import React, { createContext, useState } from "react";
import axios from "axios";

export const AllEvents = createContext();
export const EventsProvider = ({ children }) => {
  const [events, setEvents] = useState([]);
  const [eventType, setEventType] = useState("Music");
  const fetchEvents = async () => {
    try {
      const API_KEY = "HjQcNIEkdwsQswwBQhfE1PO0smAoxyu4";
      const apiUrl = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${API_KEY}&countryCode=GB&city=London&segmentName=${eventType}&size=100
      `;
      const response = await axios.get(apiUrl);
      const uniqueEvents = [];
      const eventNames = new Set();

      response.data._embedded.events.forEach((event) => {
        if (!eventNames.has(event.name)) {
          uniqueEvents.push(event);
          eventNames.add(event.name);
        }
      });

      setEvents(uniqueEvents);
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
