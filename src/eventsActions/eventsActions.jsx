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

export const eventByVenue = async (venueId = "KovZ9177kof") => {
  const apiKey = import.meta.env.VITE_TM_KEY;
  // const apiUrl = `https://app.ticketmaster.com/discovery/v2/events.json?venueId=${venueId}apikey=${apiKey}&countryCode=GB&size=${limit}&sort=date,asc`;
  const apiUrl = `https://app.ticketmaster.com/discovery/v2/events.json?venueId=${venueId}&apikey=${apiKey}&countryCode=GB&sort=date,asc`;
  try {
    const response = await axios.get(apiUrl);
    return response.data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

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

// Spotify API endpoints
const SPOTIFY_API_URL = "https://api.spotify.com/v1";

// Function to obtain access token using client credentials flow
async function getAccessToken(clientId, clientSecret) {
  const tokenEndpoint = "https://accounts.spotify.com/api/token";
  const response = await axios.post(tokenEndpoint, {
    grant_type: "client_credentials",
    client_id: clientId,
    client_secret: clientSecret,
  });
  return response.data.access_token;
}

// Function to fetch artist details from Spotify API
export async function fetchSpotifyArtistDetails(
  artistId,
  clientId,
  clientSecret
) {
  try {
    // Obtain access token
    const accessToken = await getAccessToken(clientId, clientSecret);

    // Fetch artist details
    const artistEndpoint = `${SPOTIFY_API_URL}/artists/${artistId}`;
    const response = await axios.get(artistEndpoint, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching artist details:", error);
    throw error;
  }
}

// Fill in your Spotify API client ID and client secret here
const CLIENT_ID = "98523425fd5d48dd9f4cce780d593f20";
const CLIENT_SECRET = "638d9d933dc34be6bad91019d735fd2d";
