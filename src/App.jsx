import React from "react";
import "./App.css";
import Hero from "./components/Hero";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import { CityProvider } from "./context/CityContext";
import EventsByCategory from "./components/EventsByCategory";
import EventsSection from "./components/EventsSection";

function App() {
  return (
    <>
      <CityProvider>
        <Header>
          <Navbar />
          <Hero />
        </Header>
        <EventsSection>
          <EventsByCategory />
        </EventsSection>
      </CityProvider>
    </>
  );
}

export default App;
