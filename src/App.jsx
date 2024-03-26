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
import SingleEventPage from "./components/Pages/SingleEventPage";

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
                  <EventsSection id="events">
                    <EventsByCategory />
                  </EventsSection>
                }
              />
              <Route
                path="/event/:eventId"
                element={<SingleEventPage id="single-event" />}
              />
            </Routes>
          </EventIdProvider>
        </CityProvider>
      </Router>
    </>
  );
}

export default App;
