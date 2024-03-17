import React from "react";
import "./App.css";
import Hero from "./components/Hero";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import { CityProvider } from "./context/CityContext";

function App() {
  return (
    <>
      <Header>
        <CityProvider>
          <Navbar />
          <Hero />
        </CityProvider>
      </Header>
    </>
  );
}

export default App;
