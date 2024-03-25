import React from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../Navbar";
import Hero from "../Hero";

function Header() {
  const location = useLocation();
  const showHero = !location.pathname.startsWith("/event/");

  return (
    <>
      <Navbar />
      {showHero && <Hero />}
    </>
  );
}

export default Header;
