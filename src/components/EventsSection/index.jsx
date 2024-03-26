import React from "react";

const EventsSection = ({ children, id }) => {
  return (
    <>
      <section id={id}>{children}</section>
    </>
  );
};

export default EventsSection;
