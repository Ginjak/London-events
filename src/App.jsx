import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";

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
import Footer from "./components/Footer";

function App() {
  return (
    <HelmetProvider>
      <Helmet>
        <title>Discover Music Events in the UK | Music Events UK</title>
        <meta
          name="description"
          content="Discover upcoming music events in the UK. Explore concerts, festivals, and live performances. Stay updated with the latest music scene and find your next favorite event."
        />
        <meta
          name="keywords"
          content="music events UK, music concerts, music festivals, live performances, upcoming events, UK events, music scene, event discovery"
        />
      </Helmet>
      <Router>
        <CityProvider>
          <EventIdProvider>
            <Header />
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
        <Footer />
      </Router>
    </HelmetProvider>
  );
}

export default App;
