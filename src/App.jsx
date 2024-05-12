import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import Header from "./components/Header";
import { CityProvider } from "./context/CityContext";
import { EventIdProvider } from "./context/EventIdContext";
import EventsByCategory from "./components/EventsByCategory";
import EventsSection from "./components/EventsSection";
import SingleEventPage from "./components/Pages/SingleEventPage";
import MultiSliderByCity from "./components/MultiSliderByCity";
import Search from "./components/Pages/Search";
import Contact from "./components/Pages/Contact";

function App() {
  return (
    <>
      <Router>
        <CityProvider>
          <EventIdProvider>
            <Header></Header>

            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <EventsSection id="events">
                      <EventsByCategory />
                    </EventsSection>
                    <EventsSection id="multi-slider-by-city">
                      <MultiSliderByCity />
                    </EventsSection>
                  </>
                }
              />
              <Route
                path="/event/:eventId"
                element={<SingleEventPage id="single-event" />}
              />
              <Route path="/search" element={<Search />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </EventIdProvider>
        </CityProvider>
      </Router>
    </>
  );
}

export default App;
