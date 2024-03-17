import React, { createContext, useContext, useState } from "react";

const CityContext = createContext();

export const useFormCity = () => useContext(CityContext);

export const CityProvider = ({ children }) => {
  const [formCity, setFormCity] = useState("London");

  return (
    <CityContext.Provider value={{ formCity, setFormCity }}>
      {children}
    </CityContext.Provider>
  );
};
