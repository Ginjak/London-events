import React from "react";
import "./App.css";
import Hero from "./components/Hero";
import { EventsProvider } from "./context/allEvents";
import Header from "./components/Header";

function App() {
  return (
    <>
      <Header>
        <EventsProvider>
          <Hero />
        </EventsProvider>
      </Header>
    </>
  );
}

export default App;
