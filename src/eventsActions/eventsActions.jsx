import axios from "axios";

// Future date for Ticketmaster API (15 days ahead)
export const futureDayForApi = (futureDays) => {
  const currentDate = new Date();
  const futureDate = new Date(currentDate);
  futureDate.setDate(currentDate.getDate() + futureDays);
  return futureDate.toISOString().slice(0, -5) + "Z";
};

export const startDateForApi = (date) => {
  // Convert date to ISO string
  const isoString = new Date(date).toISOString();
  // Set time to 00:01:01
  const formattedDate = new Date(isoString);
  formattedDate.setHours(1, 1, 1);
  // Return date with correct format for ticketmaster API
  return formattedDate.toISOString().slice(0, -5) + "Z";
};

export const endDateForApi = (date) => {
  // Convert date to ISO string
  const isoString = new Date(date).toISOString();
  // Set time to 23:59:59
  const formattedDate = new Date(isoString);
  formattedDate.setHours(23, 59, 59);
  // Return date with correct format for ticketmaster API
  return formattedDate.toISOString().slice(0, -5) + "Z";
};

// TICKETMASTER API

// Fetching Ticketmaster api details with default values that can be overwritten
export const fetchEvents = async (
  country = "GB",
  city = "London",
  startDate = startDateForApi(new Date()),
  endDate = futureDayForApi(15),
  eventType = "KnvZfZ7vAeA",
  limit = 5
) => {
  const apiKey = import.meta.env.VITE_TM_KEY;
  const apiUrl = `https://app.ticketmaster.com/discovery/v2/events?apikey=${apiKey}&countryCode=${country}&city=${city}&startDateTime=${startDate}&endDateTime=${endDate}&classificationName=music&genreId=${eventType}&size=${limit}&sort=date,asc`;
  try {
    const response = await axios.get(apiUrl);
    const uniqueEvents = [];
    const eventNames = new Set();

    response.data._embedded.events.forEach((event) => {
      if (!eventNames.has(event.name)) {
        uniqueEvents.push(event);
        eventNames.add(event.name);
      }
    });

    console.log("Unique Events:", uniqueEvents);
    return uniqueEvents;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

// Fetching event by ID
export const eventById = async (eventId = "") => {
  const apiKey = import.meta.env.VITE_TM_KEY;
  const apiUrl = `https://app.ticketmaster.com/discovery/v2/events/${eventId}?apikey=${apiKey}&classificationName=music&countryCode=GB
  `;
  try {
    const response = await axios.get(apiUrl);
    const data = response.data;
    console.log("This event by id data", data);
    return data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

// Fetching event by Venue
export const eventByVenue = async (venueId = "KovZ9177kof") => {
  const apiKey = import.meta.env.VITE_TM_KEY;
  const apiUrl = `https://app.ticketmaster.com/discovery/v2/events.json?venueId=${venueId}&apikey=${apiKey}&classificationName=music&countryCode=GB&sort=date,asc`;
  try {
    const response = await axios.get(apiUrl);
    console.log("This is event data", response.data);
    return response.data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

// Fething event by name
export const eventByName = async (eventName = "") => {
  const apiKey = import.meta.env.VITE_TM_KEY;
  const apiUrl = `https://app.ticketmaster.com/discovery/v2/events?keyword=${eventName}&apikey=${apiKey}&classificationName=music&countryCode=GB&sort=date,asc`;

  try {
    const response = await axios.get(apiUrl);
    const data = response.data;
    return data._embedded.events;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

// Fetching by event input name
export const fetchEventsByInput = async (
  eventName,
  startDate = startDateForApi(new Date()),
  endDate = futureDayForApi(365)
) => {
  const apiKey = import.meta.env.VITE_TM_KEY;
  const apiUrl = `https://app.ticketmaster.com/discovery/v2/events?apikey=${apiKey}&countryCode=GB&classificationName=music&startDateTime=${startDate}&endDateTime=${endDate}&keyword=${eventName}&size=200&sort=name,asc
  `;
  try {
    const response = await axios.get(apiUrl);
    const data = response.data._embedded.events;
    console.log("All events ", data);
    return data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

// Last.fm API

// Fetch Last.fm details about artis depending on selected "getInfo"
export const fetchLastFmArtistData = async (
  getInfo = "getinfo",
  artistName
) => {
  const apiKey = "ca1ab57b95e69724bc082828ee30c493";
  const apiUrl = `https://ws.audioscrobbler.com/2.0/?method=artist.${getInfo}&artist=${artistName}&api_key=${apiKey}&format=json`;

  try {
    const response = await axios.get(apiUrl);
    const data = response.data;
    console.log("Artist bio: ", data);
    return data;
  } catch (error) {
    console.error("Error fetching artist bio:", error);
    throw error;
  }
};

// Fetch Last.fm track by artist and track name

export const fetchLastFmTrack = async (
  trackName = "Despacito",
  artistName = "Luis Fonsi"
) => {
  const apiKey = "ca1ab57b95e69724bc082828ee30c493";
  const apiUrl = `https://ws.audioscrobbler.com/2.0/?method=track.search&track=${trackName}&artist=${artistName}&api_key=${apiKey}&format=json`;

  try {
    const response = await axios.get(apiUrl);
    const data = response.data;
    console.log("Track details", data);
    return data;
  } catch (error) {
    console.error("Error fetching artist bio:", error);
    throw error;
  }
};

// const lastFmApi = "ca1ab57b95e69724bc082828ee30c493";
// const lastFmSec = "7247ee743e946b473c12b8ca12288e45";
// const fourSquareApi = "fsq3r8CxhmSfEdP9dBcJIqMuqU39EeJWWj7+yQeLUjte498=";

// url to bookig.dom https://www.booking.com/hotel/gb/the-berkeley.en-gb.html

export const fetchHotels = async (
  category = "4bf58dd8d48988d1fa931735",
  latitude = 51.5072,
  longitude = 0.1276
) => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: "fsq3r8CxhmSfEdP9dBcJIqMuqU39EeJWWj7+yQeLUjte498=",
    },
  };

  try {
    const response = await axios.get(
      `https://api.foursquare.com/v3/places/search?categories=${category}&ll=${latitude}%2C${longitude}&radius=5000&sort=POPULARITY`,
      options
    );
    console.log("Fetched hotel data:", response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
