import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import Hero from "./components/Hero";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import { CityProvider } from "./context/CityContext";
import { EventIdProvider } from "./context/EventIdContext";
import EventsByCategory from "./components/EventsByCategory";
import EventsSection from "./components/EventsSection";
import SingleEvent from "./components/SingleEvent";

function App() {
  return (
    <>
      <Router>
        <CityProvider>
          <EventIdProvider>
            <Header></Header>
            <EventsSection>
              <Routes>
                <Route path="/" element={<EventsByCategory />} />
                <Route path="/event/:eventId" element={<SingleEvent />} />
              </Routes>
            </EventsSection>
          </EventIdProvider>
        </CityProvider>
      </Router>
    </>
  );
}

export default App;
