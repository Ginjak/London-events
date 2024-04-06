import React from "react";
import SingleEvent from "../../SingleEvent";
import Hotels from "../../Hotels";

const SingleEventPage = ({ id }) => {
  return (
    <>
      <section id={id}>
        <SingleEvent />
        <Hotels />
      </section>
    </>
  );
};

export default SingleEventPage;
