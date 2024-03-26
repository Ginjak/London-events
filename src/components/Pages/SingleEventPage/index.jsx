import React from "react";
import SingleEvent from "../../SingleEvent";

const SingleEventPage = ({ id }) => {
  return (
    <>
      <section id={id}>
        <SingleEvent />
      </section>
    </>
  );
};

export default SingleEventPage;
