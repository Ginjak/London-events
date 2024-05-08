import React from "react";

const EventsSection = ({ children, id, className }) => {
  return (
    <>
      <section id={id} className={className}>
        {children}
      </section>
    </>
  );
};

export default EventsSection;
