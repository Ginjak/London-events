import React from "react";
import "./App.css";
import Hero from "./components/Hero";
import { EventsProvider } from "./context/allEvents";
function App() {
  return (
    <>
      <EventsProvider>
        <Hero />
      </EventsProvider>
    </>
  );
}

export default App;
