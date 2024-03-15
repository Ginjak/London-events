import React, { createContext, useState } from "react";
import { fetchEvents, startDateForApi } from "../eventsActions/eventsActions";

export const eventsData = createContext();
export const EventsProvider = ({ children }) => {
  const [events, setEvents] = useState([]);
  fetchEvents();
};
