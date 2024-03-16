import React from "react";
import "./App.css";
import Hero from "./components/Hero";
import Header from "./components/Header";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Header>
        <Navbar />
        <Hero />
      </Header>
    </>
  );
}

export default App;
