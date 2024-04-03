import React, { useEffect, useState } from "react";
import "./singleevent.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import {
  eventById,
  eventByVenue,
  eventByName,
  fetchLastFmArtistData,
  fetchLastFmTrack,
} from "../../eventsActions/eventsActions";

import { imageSizeApi } from "../../eventsActions/utilityFunctions";
import axios from "axios";

const SingleEvent = () => {
  const navigate = useNavigate();
  const { eventId } = useParams();
  const [eventData, setEventData] = useState(null);
  const [eventBgImg, setEventBgImg] = useState("");
  const [venueId, setVenueId] = useState(null);
  const [venueEventsNumber, setVenueEventsNumber] = useState(6);
  const [eventsByVenue, setEventsByVenue] = useState("");
  const [eventsByName, setEventsByName] = useState("");
  const [artistBio, setArtistBio] = useState("");
  const [artistTopAlbums, setArtistTopAlbums] = useState("");
  const [artistTopTracks, setArtistTopTracks] = useState("");

  const [isButtonToggled, setIsButtonToggled] = useState(false);

  const handleButtonClick = () => {
    setIsButtonToggled((prevState) => !prevState);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // setIsLoading(true);

        const data = await eventById(eventId, venueEventsNumber);
        setEventData(data);
        // setIsLoading(false);

        setEventBgImg(imageSizeApi(data.images, 700));
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

        // Get track details

        const artistTrackDetails = await fetchLastFmTrack(undefined, undefined);

        console.log("Search by ID data:", data);

        // console.log("display events value:", displayEvents);
        // console.log("Render events: " + renderEvents);
      } catch (error) {
        console.error(`Test ${error}`);
        // setEvents([]);
      } finally {
        // setIsLoading(false);
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
    return <div className="text-white">Loading...</div>;
  }

  return (
    <div className="container-xxl py-5">
      <div className="text-dark">
        <div className="row single-event-card">
          <div className="col-lg-6 px-0 ">
            <div
              className="text-time-title-wraper position-relative px-4 py-3 d-flex justify-content-center align-items-center"
              style={{ backgroundImage: `url(${eventBgImg})` }}
            >
              <div className="overlay"></div>
              <div className="event-date d-flex flex-column justify-content-center align-items-center">
                <p className="m-0">
                  {new Date(eventData.dates.start.dateTime).toLocaleString(
                    "default",
                    {
                      month: "short",
                    }
                  )}
                </p>
                <p className="m-0">
                  {new Date(eventData.dates.start.dateTime)
                    .getDate()
                    .toString()
                    .padStart(2, "0")}
                </p>
              </div>
              <div className="time-location-wraper">
                <p className="card-info mb-0 position-relative">
                  {eventData.dates.start.localTime
                    .split(":")
                    .slice(0, 2)
                    .join(":")}
                </p>
              </div>
              <h3 className="single-event-title text-white mb-0">
                {eventData.name}
              </h3>
            </div>
            <div className="event-details-wraper px-4 py-3 ">
              <div className="genre-price-venue d-flex justify-content-between">
                <div className="genre-price-tickets d-flex flex-column justify-content-between">
                  <div className="genre-price">
                    {eventData?.classifications?.[0] && (
                      <p className="details-genre mb-4 mb-sm-1">
                        {eventData.classifications[0].genre.name}
                      </p>
                    )}
                  </div>
                  {eventData?.url && (
                    <div className="tickets-btn-wraper mb-0">
                      {eventData?.priceRanges?.[0] && (
                        <p className="price-from mb-2 mb-sm-1">
                          From £<span>{eventData?.priceRanges[0]?.min}</span>
                        </p>
                      )}
                      <Link
                        to={eventData?.url}
                        className="dates-btn d-block d-sm-inline-block text-center text-sm-start"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Get Tickets!
                      </Link>
                    </div>
                  )}
                </div>

                {eventData?._embedded?.venues && (
                  <div className="venue-info d-flex flex-column ">
                    <p className="text-end mb-1 venue-name">
                      {eventData?._embedded?.venues[0].name}
                    </p>
                    <p className="text-end mb-1 venue-address">
                      {eventData?._embedded?.venues[0]?.address?.line1}
                    </p>
                    <p className="text-end mb-1 venue-address">
                      {eventData?._embedded?.venues[0]?.postalCode}
                    </p>
                    <p className="text-end mb-1 venue-address">
                      {eventData?._embedded?.venues[0]?.city?.name}
                    </p>
                    <Link
                      className="text-end directions mt-3"
                      to={`https://www.google.com/maps/dir/Current+Location/${eventData?._embedded?.venues[0]?.location?.latitude},${eventData?._embedded?.venues[0]?.location?.longitude}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fa-solid fa-location-dot me-2"></i>
                      Directions
                    </Link>
                  </div>
                )}
              </div>
            </div>
            {eventData?._embedded?.venues?.[0] && (
              <div
                className="accordion accordion-flush"
                id="accordionFlushExample"
              >
                <div className="accordion-item">
                  <h3
                    className="accordion-header event-by-venue-title"
                    id="flush-headingOne"
                  >
                    <button
                      className={`accordion-button ${
                        isButtonToggled ? "" : "collapsed"
                      }`}
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#flush-collapseOne"
                      aria-expanded={isButtonToggled ? "true" : "false"}
                      aria-controls="flush-collapseOne"
                      onClick={handleButtonClick}
                    >
                      More events at {eventData?._embedded?.venues[0]?.name}
                    </button>
                  </h3>
                  <div
                    id="flush-collapseOne"
                    className="accordion-collapse collapse"
                    aria-labelledby="flush-headingOne"
                    data-bs-parent="#accordionFlushExample"
                  >
                    <div className="events-by-venue py-3 ">
                      <div className="more-events-at-venue-wraper pe-2">
                        {eventsByVenue &&
                        eventsByVenue._embedded &&
                        eventsByVenue._embedded.events.length > 0 ? (
                          eventsByVenue._embedded.events.map((event, index) => (
                            <ScrollLink
                              to="single-event"
                              smooth={true}
                              duration={500}
                            >
                              <div
                                className="event-details-wraper d-flex justify-content-between py-2"
                                key={index}
                                onClick={() => handleEventUpdate(event.id)}
                              >
                                <div className="event-venue-date-wraper">
                                  <div className="event-venue-date d-flex flex-column justify-content-center ">
                                    <p className="m-0">
                                      {new Date(
                                        eventsByVenue._embedded.events[
                                          index
                                        ].dates.start.localDate
                                      ).toLocaleString("default", {
                                        month: "short",
                                      })}
                                    </p>

                                    <p className="m-0">
                                      {new Date(
                                        eventsByVenue._embedded.events[
                                          index
                                        ].dates.start.localDate
                                      )
                                        .getDate()
                                        .toString()
                                        .padStart(2, "0")}
                                    </p>
                                  </div>
                                </div>
                                <div className="event-title-time-wraper ps-2 text-end d-flex flex-column justify-content-between">
                                  <p className="m-0">
                                    {eventsByVenue._embedded.events[index].name}
                                  </p>
                                  <p className="m-0 ">
                                    {eventsByVenue._embedded.events[
                                      index
                                    ].dates.start.localTime
                                      .split(":")
                                      .slice(0, 2)
                                      .join(":")}
                                  </p>
                                </div>
                              </div>
                            </ScrollLink>
                          ))
                        ) : (
                          <p>ASDa</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="col-lg-6 px-0 band-events">
            {artistBio.artist && eventsByName.length > 1 ? (
              <div className="artist-info px-4 py-3">
                <div className="artist-info-container">
                  <ul className="nav mt-0" id="myTabs" role="tablist">
                    {artistBio.artist.bio.summary && (
                      <li className="nav-item" role="presentation">
                        <button
                          className="nav-link active"
                          id="bio-tab"
                          data-bs-toggle="tab"
                          data-bs-target="#bio"
                          type="button"
                          role="tab"
                          aria-controls="bio"
                          aria-selected="true"
                        >
                          Bio
                        </button>
                      </li>
                    )}
                    {artistTopAlbums.topalbums && (
                      <li className="nav-item" role="presentation">
                        <button
                          className="nav-link"
                          id="top-albums-tab"
                          data-bs-toggle="tab"
                          data-bs-target="#top-albums"
                          type="button"
                          role="tab"
                          aria-controls="top-albums"
                          aria-selected="false"
                        >
                          Top Albums
                        </button>
                      </li>
                    )}
                    {artistTopTracks.toptracks && (
                      <li className="nav-item" role="presentation">
                        <button
                          className="nav-link"
                          id="top-tracks-tab"
                          data-bs-toggle="tab"
                          data-bs-target="#top-tracks"
                          type="button"
                          role="tab"
                          aria-controls="top-tracks"
                          aria-selected="false"
                        >
                          Top Tracks
                        </button>
                      </li>
                    )}
                  </ul>

                  <div className="tab-content mt-2">
                    <div
                      className="tab-pane fade show active"
                      id="bio"
                      role="tabpanel"
                      aria-labelledby="bio-tab"
                    >
                      {artistBio.artist.bio.summary && (
                        <p className="artist-bio-summary">
                          {artistBio?.artist?.bio?.summary?.replace(
                            /<a [^>]+>[^<]*<\/a>/g,
                            ""
                          )}
                        </p>
                      )}
                    </div>
                    {artistTopAlbums.topalbums && (
                      <div
                        className="tab-pane fade"
                        id="top-albums"
                        role="tabpanel"
                        aria-labelledby="top-albums-tab"
                      >
                        <div className=" top-albums-wraper row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-2 row-cols-xl-3 g-4">
                          {artistTopAlbums.topalbums.album
                            .slice(0, 12)
                            .map((album, index) => {
                              const albumImage = album.image[2]["#text"];
                              const albumName = album.name;
                              const albumUrl = album.url;

                              if (
                                albumImage !== "(null)" &&
                                albumImage !== "" &&
                                albumName !== "(null)"
                              ) {
                                return (
                                  <a
                                    href={albumUrl}
                                    target="_blank"
                                    key={index}
                                  >
                                    <div className="album-wraper col">
                                      <div
                                        className="album-image-wraper position-relative"
                                        style={{
                                          backgroundImage: `url(${albumImage})`,
                                        }}
                                      >
                                        <p className="album-title mb-0">
                                          {albumName}
                                        </p>
                                      </div>
                                    </div>
                                  </a>
                                );
                              }
                            })}
                        </div>
                      </div>
                    )}
                    {artistTopTracks.toptracks && (
                      <div
                        className="tab-pane fade"
                        id="top-tracks"
                        role="tabpanel"
                        aria-labelledby="top-albums-tab"
                      >
                        <ol className="top-tracks-list">
                          {artistTopTracks.toptracks.track
                            .slice(0, 10)
                            .map((track, index) => {
                              const trackName = track.name;
                              const trackUrl = track.url;
                              if (trackName !== "(null)" && trackName !== "") {
                                return (
                                  <li key={index}>
                                    <a href={trackUrl} target="_blank">
                                      {trackName}
                                    </a>
                                  </li>
                                );
                              }
                            })}
                        </ol>
                      </div>
                    )}
                  </div>
                </div>
                <div
                  className="band-events-wraper  py-3"
                  style={{ height: isButtonToggled ? "530px" : "232px" }}
                >
                  {eventsByName.length > 1 && (
                    <h5 className="more-show-title ">
                      More shows of {eventsByName[0].name}
                    </h5>
                  )}
                  <div
                    className="more-events-by-band-wraper"
                    style={{ height: isButtonToggled ? "500px" : "182px" }}
                  >
                    {eventsByName.length > 1 ? (
                      eventsByName.map((event, index) => (
                        <ScrollLink
                          to="single-event"
                          smooth={true}
                          duration={500}
                          className="band-event-details-wraper d-flex justify-content-between py-2"
                          key={index}
                          onClick={() =>
                            handleEventUpdate(eventsByName[index].id)
                          }
                        >
                          <div className="band-event-venue-date-wraper d-flex flex-column justify-content-center">
                            <p className="m-0">
                              {new Date(
                                eventsByName[index].dates.start.localDate
                              ).toLocaleString("default", {
                                month: "short",
                              })}
                            </p>
                            <p className="m-0">
                              {new Date(
                                eventsByName[index].dates.start.localDate
                              )
                                .getDate()
                                .toString()
                                .padStart(2, "0")}
                            </p>
                          </div>
                          <div className="band-event-location-time ps-2 text-end d-flex flex-column justify-content-between">
                            {eventsByName && (
                              <p className="mb-0">
                                {eventsByName[index]?.name}
                              </p>
                            )}
                            {eventsByName && (
                              <p className="mb-0">
                                {
                                  eventsByName[index]?._embedded?.venues[0]
                                    ?.city?.name
                                }
                              </p>
                            )}
                            {eventsByName && (
                              <p className="mb-0">
                                {eventsByName[index]?.dates?.start?.localTime
                                  ?.split(":")
                                  .slice(0, 2)
                                  .join(":")}
                              </p>
                            )}
                          </div>
                        </ScrollLink>
                      ))
                    ) : (
                      <p>No results test</p>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <p>No Data</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleEvent;
