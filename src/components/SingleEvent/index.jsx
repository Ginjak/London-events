import React, { useEffect, useState } from "react";
import "./singleevent.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import {
  eventById,
  eventByVenue,
  eventByName,
  fetchLastFmArtistData,
  fetchHotels,
  fetchEvents,
} from "../../eventsActions/eventsActions";

import { imageSizeApi } from "../../eventsActions/utilityFunctions";
import axios from "axios";
import Hotels from "../Hotels";
import EstablishmentTab from "../EstablishmentTab";
import SingleEventCard from "../SingleEventCard";
import MultipleSlider from "../MultipleSlider";

const SingleEvent = () => {
  const navigate = useNavigate();
  const { eventId } = useParams();
  const [eventData, setEventData] = useState(null);
  const [allEventsToday, setAllEventsToday] = useState(null);
  const [eventBgImg, setEventBgImg] = useState("");
  const [venueId, setVenueId] = useState(null);
  const [venueEventsNumber, setVenueEventsNumber] = useState(6);
  const [eventsByVenue, setEventsByVenue] = useState("");
  const [eventsByName, setEventsByName] = useState("");
  const [artistBio, setArtistBio] = useState("");
  const [artistTopAlbums, setArtistTopAlbums] = useState("");
  const [artistTopTracks, setArtistTopTracks] = useState("");
  const [isButtonToggled, setIsButtonToggled] = useState(false);
  const [hotels, setHotels] = useState("");
  const [restaurants, setRestaurants] = useState("");

  // Loading states
  const [eventCardLoading, setEventCardLoading] = useState(true);
  const [componentLoading, setComponentLoading] = useState(false);
  const [hotelLoading, setHotelLoading] = useState(true);

  const handleButtonClick = () => {
    setIsButtonToggled((prevState) => !prevState);
  };

  useEffect(() => {
    const fetchData = async () => {
      setHotelLoading(true);
      try {
        if (eventCardLoading === false) {
          setComponentLoading(true);
        }
        const data = await eventById(eventId, venueEventsNumber);
        setEventData(data);

        const imageData = await imageSizeApi(data.images, 700);
        setEventBgImg(imageData);

        // setVenueId(data._embedded.venues[0].id);
        const eventDataByName = await eventByName(data.name);
        const filteredEvents = eventDataByName.filter(
          (event) => event.name === data.name
        );
        setEventsByName(filteredEvents);
        const dataVenue = await eventByVenue(data._embedded.venues[0].id);
        setEventsByVenue(dataVenue);

        // Get artist Bio data
        const artistBioData = await fetchLastFmArtistData(undefined, data.name);
        setArtistBio(artistBioData);
        // Get artist top Album
        const artistTopAlb = await fetchLastFmArtistData(
          "gettopalbums",
          data.name
        );
        setArtistTopAlbums(artistTopAlb);

        // Get artist top Tracks
        const artistTopTrc = await fetchLastFmArtistData(
          "gettoptracks",
          data.name
        );
        setArtistTopTracks(artistTopTrc);
        console.log("Search by ID data:", data);
        setComponentLoading(false);

        if (data._embedded.venues[0].city.name && !componentLoading) {
          const eventsToday = await fetchEvents(
            undefined,
            data._embedded.venues[0].city.name,
            undefined,
            undefined,
            "",
            10
          );
          setAllEventsToday(eventsToday);
        }

        const hotelsData = await fetchHotels(
          undefined,
          data?._embedded.venues?.[0].location?.latitude,
          data?._embedded?.venues?.[0].location?.longitude
        );
        setHotels(hotelsData);
        setHotelLoading(true);

        const restaurantsData = await fetchHotels(
          "4d4b7105d754a06374d81259",
          data?._embedded?.venues?.[0].location?.latitude,
          data?._embedded?.venues?.[0].location?.longitude
        );
        setRestaurants(restaurantsData);
      } catch (error) {
        console.error(`Test ${error}`);
        // setEvents([]);
      } finally {
        setEventCardLoading(false);
        setHotelLoading(false);
      }
    };

    // Call fetchData when formCity changes
    fetchData();
    console.log("This is a new id ", eventId);
    console.log("EVent by name", eventsByName);
    // setDatesSelected(false);
  }, [eventId]);

  const handleEventUpdate = (updatedEventId) => {
    navigate(`/event/${updatedEventId}`);
  };

  // Render loading indicator while fetching data
  if (!eventData) {
    return <div className="fetch-data"></div>;
  }

  return (
    <>
      <div className="container-xxl py-5">
        <SingleEventCard
          eventBg={eventBgImg}
          eventDetails={eventData}
          buttonToggle={isButtonToggled}
          venueDetails={eventsByVenue}
          artistBioDetails={artistBio}
          eventNameDetails={eventsByName}
          artistAlbums={artistTopAlbums}
          artistTracks={artistTopTracks}
          cardLoading={eventCardLoading}
          componentLoading={componentLoading}
          eventsToday={allEventsToday}
        />

        <EstablishmentTab
          hotelsTab={hotels}
          restaurantTab={restaurants}
          hotelLoading={hotelLoading}
        />
      </div>
      <MultipleSlider
        popularEvents={allEventsToday}
        title={`More events in ${eventData?._embedded?.venues?.[0].city?.name}`}
      />
    </>
  );
};

export default SingleEvent;
