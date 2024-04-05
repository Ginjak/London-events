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
  formattedDate.setHours(0, 1, 1);
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
  const apiUrl = `https://app.ticketmaster.com/discovery/v2/events/${eventId}?apikey=${apiKey}&countryCode=GB
  `;
  try {
    const response = await axios.get(apiUrl);
    const data = response.data;
    return data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

// Fetching event by Venue
export const eventByVenue = async (venueId = "KovZ9177kof") => {
  const apiKey = import.meta.env.VITE_TM_KEY;
  const apiUrl = `https://app.ticketmaster.com/discovery/v2/events.json?venueId=${venueId}&apikey=${apiKey}&countryCode=GB&sort=date,asc`;
  try {
    const response = await axios.get(apiUrl);
    return response.data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

// Fething event by name
export const eventByName = async (eventName = "") => {
  const apiKey = import.meta.env.VITE_TM_KEY;
  const apiUrl = `https://app.ticketmaster.com/discovery/v2/events?keyword=${eventName}&apikey=${apiKey}&countryCode=GB&sort=date,asc`;

  try {
    const response = await axios.get(apiUrl);
    const data = response.data;
    return data._embedded.events;
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
  const apiKey = import.meta.env.VITE_LAST_FM_API;
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
  const apiKey = import.meta.env.VITE_LAST_FM_API;
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

export const fetchHotels = async (latitude, longitude) => {
  const CLIENT_ID = "NOV3GP0I55VOVMRJA3RHJKGEADLPWXVUEEYJPLRBWW0RQF40";
  const CLIENT_SECRET = "5PLEVDZBAEXX1GANPTQQOFUVU1ALVGV5QCHXQMACRJANHP0P";
  const VERSION = "20220405"; // Today's date in YYYYMMDD format
  try {
    const response = await axios.get(
      "https://api.foursquare.com/v2/venues/search",
      {
        params: {
          client_id: CLIENT_ID,
          client_secret: CLIENT_SECRET,
          v: VERSION,
          ll: `${latitude},${longitude}`,
          categoryId: "4bf58dd8d48988d1fa931735", // Category ID for hotels
          limit: 10, // Limiting to 10 results
        },
      }
    );

    return response.data.response.venues;
  } catch (error) {
    console.error("Error fetching hotels:", error);
    throw error;
  }
};
