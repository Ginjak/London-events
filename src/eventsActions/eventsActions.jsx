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
  keyword = "",
  eventName = `&keyword=${keyword}`,
  limit = 5
) => {
  const apiKey = "HjQcNIEkdwsQswwBQhfE1PO0smAoxyu4";
  // const apiUrl = `https://app.ticketmaster.com/discovery/v2/events?apikey=${apiKey}&countryCode=${country}&city=${city}&startDateTime=${startDate}&endDateTime=${endDate}&classificationName=music&keyword=${eventType}&size=${limit}`;
  // console.log("API URL:", apiUrl);

  const apiUrl = `https://app.ticketmaster.com/discovery/v2/events?apikey=${apiKey}&countryCode=${country}&city=${city}&startDateTime=${startDate}&endDateTime=${endDate}&classificationName=music&genreId=${eventType}${eventName}&size=${limit}&sort=date,asc`;
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
