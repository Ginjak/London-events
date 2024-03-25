import React, { useEffect } from "react";
import "./singleevent.css";
import { fetchEvents } from "../../eventsActions/eventsActions";
import { useFormCity } from "../../context/CityContext";
import { useEventId } from "../../context/EventIdContext";

const SingleEvent = () => {
  const { formCity } = useFormCity();
  const { eventId } = useEventId(); // Destructure eventId correctly

  useEffect(() => {
    console.log("eventId:", eventId);
    console.log("city:", formCity);
    const fetchData = async () => {
      try {
        // setIsLoading(true);
        const data = await fetchEvents(
          undefined,
          formCity,
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
          undefined
        );
        // setEvents(data);
        // setIsLoading(false);
      } catch (error) {
        console.error(`Test ${error}`);
        // setEvents([]);
      } finally {
        // setIsLoading(false);
      }
    };

    // Call fetchData when formCity or eventId changes
    fetchData();
    // setDatesSelected(false);
  }, [formCity, eventId]);

  return <div>Single Event</div>;
};

export default SingleEvent;
