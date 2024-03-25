import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const SingleEvent = () => {
  const { eventId } = useParams(); // Extract eventId from URL params
  const [eventData, setEventData] = useState(null); // State to hold event data
  const apiKey = "HjQcNIEkdwsQswwBQhfE1PO0smAoxyu4"; // Ticketmaster API key

  // Function to fetch event data by eventId
  const fetchEventById = async (eventId) => {
    try {
      const response = await axios.get(
        `https://app.ticketmaster.com/discovery/v2/events/${eventId}?apikey=${apiKey}`
      );
      setEventData(response.data); // Set event data to state
    } catch (error) {
      console.error("Error fetching event data:", error);
      // Optionally handle errors here
    }
  };

  useEffect(() => {
    fetchEventById(eventId); // Fetch event data on component mount
  }, [eventId]); // Re-fetch event data when eventId changes

  // Render loading indicator while fetching data
  if (!eventData) {
    return <div className="text-white">Loading...</div>;
  }

  // Once data is fetched, render event details
  return (
    <div className="text-white">
      {/* Render event details here using eventData */}
      {/* Example: <h1>{eventData.name}</h1> */}
      <h1>{eventData.name}</h1>
    </div>
  );
};

export default SingleEvent;
