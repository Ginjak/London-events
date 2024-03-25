// EventIdProvider.js
import React, { createContext, useContext, useState } from "react";

const EventIdContext = createContext();

export const useEventId = () => useContext(EventIdContext);

export const EventIdProvider = ({ children }) => {
  const [eventId, setEventId] = useState("");

  return (
    <EventIdContext.Provider value={{ eventId, setEventId }}>
      {children}
    </EventIdContext.Provider>
  );
};
