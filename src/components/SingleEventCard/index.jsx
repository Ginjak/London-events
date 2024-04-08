import React, { useState } from "react";
import "./singleeventcard.css";
import { Link, useNavigate } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";

const SingleEventCard = ({
  eventBg,
  imgLoading,
  artistLoading,
  eventDetails,
  venueDetails,
  artistBioDetails,
  eventNameDetails,
  artistAlbums,
  artistTracks,
}) => {
  const [btnToggled, setbtnToggled] = useState(false);
  const navigate = useNavigate();

  const btnToggle = () => {
    setbtnToggled((prevState) => !prevState);
  };

  const handleEventUpdate = (updatedEventId) => {
    navigate(`/event/${updatedEventId}`);
  };

  return (
    <div className="row single-event-card">
      <div className="col-lg-6 px-0 ">
        <div
          className="text-time-title-wraper position-relative px-4 py-3 d-flex justify-content-center align-items-center"
          style={{ backgroundImage: `url(${eventBg})` }}
        >
          {imgLoading && (
            <div className="loading-wraper">
              <div
                className="large-spinner spinner-border text-white"
                role="status"
              ></div>
            </div>
          )}
          <div className="overlay"></div>
          <div className="event-date d-flex flex-column justify-content-center align-items-center">
            <p className="m-0">
              {new Date(eventDetails.dates.start.dateTime).toLocaleString(
                "default",
                {
                  month: "short",
                }
              )}
            </p>
            <p className="m-0">
              {new Date(eventDetails.dates.start.dateTime)
                .getDate()
                .toString()
                .padStart(2, "0")}
            </p>
          </div>
          <div className="time-location-wraper">
            <p className="card-info mb-0 position-relative">
              {eventDetails.dates.start.localTime
                .split(":")
                .slice(0, 2)
                .join(":")}
            </p>
          </div>
          <h3 className="single-event-title text-white mb-0">
            {eventDetails.name}
          </h3>
        </div>
        <div className="event-details-wraper px-4 py-3 ">
          <div className="genre-price-venue d-flex justify-content-between">
            <div className="genre-price-tickets d-flex flex-column justify-content-between">
              <div className="genre-price">
                {eventDetails?.classifications?.[0] && (
                  <p className="details-genre mb-4 mb-sm-1">
                    {eventDetails.classifications[0].genre.name}
                  </p>
                )}
              </div>
              {eventDetails?.url && (
                <div className="tickets-btn-wraper mb-0">
                  {eventDetails?.priceRanges?.[0] && (
                    <p className="price-from mb-2 mb-sm-1">
                      From £<span>{eventDetails?.priceRanges[0]?.min}</span>
                    </p>
                  )}
                  <Link
                    to={eventDetails?.url}
                    className="dates-btn d-block d-sm-inline-block text-center text-sm-start"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Get Tickets!
                  </Link>
                </div>
              )}
            </div>

            {eventDetails?._embedded?.venues && (
              <div className="venue-info d-flex flex-column ">
                <p className="text-end mb-1 venue-name">
                  {eventDetails?._embedded?.venues[0].name}
                </p>
                <p className="text-end mb-1 venue-address">
                  {eventDetails?._embedded?.venues[0]?.address?.line1}
                </p>
                <p className="text-end mb-1 venue-address">
                  {eventDetails?._embedded?.venues[0]?.postalCode}
                </p>
                <p className="text-end mb-1 venue-address">
                  {eventDetails?._embedded?.venues[0]?.city?.name}
                </p>
                <Link
                  className="text-end directions mt-3"
                  to={`https://www.google.com/maps/dir/Current+Location/${eventDetails?._embedded?.venues[0]?.location?.latitude},${eventDetails?._embedded?.venues[0]?.location?.longitude}`}
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
        {eventDetails?._embedded?.venues?.[0] && (
          <div className="accordion accordion-flush" id="accordionFlushExample">
            <div className="accordion-item">
              <h3
                className="accordion-header event-by-venue-title"
                id="flush-headingOne"
              >
                <button
                  className={`accordion-button ${
                    btnToggled ? "" : "collapsed"
                  }`}
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#flush-collapseOne"
                  aria-expanded={btnToggled ? "true" : "false"}
                  aria-controls="flush-collapseOne"
                  onClick={btnToggle}
                >
                  More events at {eventDetails?._embedded?.venues[0]?.name}
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
                    {venueDetails &&
                    venueDetails._embedded &&
                    venueDetails._embedded.events.length > 0 ? (
                      venueDetails._embedded.events.map((event, index) => (
                        <ScrollLink
                          to="single-event"
                          smooth={true}
                          duration={500}
                          key={index}
                        >
                          <div
                            className="event-details-wraper d-flex justify-content-between py-2"
                            onClick={() => handleEventUpdate(event.id)}
                          >
                            <div className="event-venue-date-wraper">
                              <div className="event-venue-date d-flex flex-column justify-content-center ">
                                <p className="m-0">
                                  {new Date(
                                    venueDetails._embedded.events[
                                      index
                                    ].dates.start.localDate
                                  ).toLocaleString("default", {
                                    month: "short",
                                  })}
                                </p>

                                <p className="m-0">
                                  {new Date(
                                    venueDetails._embedded.events[
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
                                {venueDetails._embedded.events[index].name}
                              </p>
                              <p className="m-0 ">
                                {venueDetails._embedded.events[
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
      <div className="col-lg-6 px-0 band-events position-relative">
        {artistLoading && (
          <div className="loading-wraper">
            <div
              className="large-spinner spinner-border text-white"
              role="status"
            ></div>
          </div>
        )}

        {artistBioDetails.artist && eventNameDetails.length > 1 ? (
          <div className="artist-info px-4 py-3">
            <div className="artist-info-container">
              <ul className="nav mt-0" id="myTabs" role="tablist">
                {artistBioDetails.artist.bio.summary &&
                  artistBioDetails.artist.bio.summary !== "" &&
                  artistBioDetails.artist.bio.summary !==
                    ` <a href="https://www.last.fm/music/Bronnie">Read more on Last.fm</a>` &&
                  artistBioDetails.artist.bio.content !== "" && (
                    <li className="nav-item" role="presentation">
                      <button
                        // className="nav-link"
                        className={`nav-link ${
                          artistBioDetails.artist.bio.summary !== ""
                            ? "active"
                            : ""
                        }`}
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
                {artistAlbums.topalbums &&
                  artistAlbums.topalbums.album.length > 1 && (
                    <li className="nav-item" role="presentation">
                      <button
                        // className="nav-link"
                        className={`nav-link ${
                          artistBioDetails.artist.bio.summary === "" &&
                          artistAlbums.topalbums.album.length > 1
                            ? "active"
                            : ""
                        }`}
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
                {artistTracks.toptracks && (
                  <li className="nav-item" role="presentation">
                    <button
                      // className="nav-link"
                      className={`nav-link ${
                        artistAlbums.topalbums.album.length <= 1 &&
                        artistTracks.toptracks
                          ? "active"
                          : ""
                      }`}
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
                {artistBioDetails.artist.bio.summary &&
                  artistBioDetails.artist.bio.summary !== "" &&
                  artistBioDetails.artist.bio.summary !==
                    ` <a href="https://www.last.fm/music/Bronnie">Read more on Last.fm</a>` && (
                    <div
                      className={`tab-pane fade ${
                        artistBioDetails.artist.bio.summary !== ""
                          ? "show active"
                          : ""
                      }`}
                      id="bio"
                      role="tabpanel"
                      aria-labelledby="bio-tab"
                    >
                      <p className="artist-bio-summary">
                        {artistBioDetails?.artist?.bio?.summary?.replace(
                          /<a [^>]+>[^<]*<\/a>/g,
                          ""
                        )}
                      </p>
                    </div>
                  )}

                {artistAlbums.topalbums &&
                  artistAlbums.topalbums.album.length > 1 && (
                    <div
                      className={`tab-pane fade ${
                        artistBioDetails.artist.bio.content === ""
                          ? "show active"
                          : ""
                      }`}
                      id="top-albums"
                      role="tabpanel"
                      aria-labelledby="top-albums-tab"
                    >
                      <div className=" top-albums-wraper row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-2 row-cols-xl-3 g-4 ">
                        {artistAlbums.topalbums.album
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
                                <a href={albumUrl} target="_blank" key={index}>
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
                {artistTracks.toptracks && (
                  <div
                    className={`tab-pane fade ${
                      artistAlbums.topalbums.album.length <= 1 &&
                      artistTracks.toptracks
                        ? "show active"
                        : ""
                    }`}
                    id="top-tracks"
                    role="tabpanel"
                    aria-labelledby="top-albums-tab"
                  >
                    <ol className="top-tracks-list">
                      {artistTracks.toptracks.track
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
              style={{ height: btnToggled ? "530px" : "232px" }}
            >
              {eventNameDetails.length > 1 && (
                <h5 className="more-show-title ">
                  More shows of {eventNameDetails[0].name}
                </h5>
              )}
              <div
                className="more-events-by-band-wraper"
                style={{ height: btnToggled ? "500px" : "182px" }}
              >
                {eventNameDetails.length > 1 ? (
                  eventNameDetails.map((event, index) => (
                    <ScrollLink
                      to="single-event"
                      smooth={true}
                      duration={500}
                      className="band-event-details-wraper d-flex justify-content-between py-2"
                      key={index}
                      onClick={() =>
                        handleEventUpdate(eventNameDetails[index].id)
                      }
                    >
                      <div className="band-event-venue-date-wraper d-flex flex-column justify-content-center">
                        <p className="m-0">
                          {new Date(
                            eventNameDetails[index].dates.start.localDate
                          ).toLocaleString("default", {
                            month: "short",
                          })}
                        </p>
                        <p className="m-0">
                          {new Date(
                            eventNameDetails[index].dates.start.localDate
                          )
                            .getDate()
                            .toString()
                            .padStart(2, "0")}
                        </p>
                      </div>
                      <div className="band-event-location-time ps-2 text-end d-flex flex-column justify-content-between">
                        {eventNameDetails && (
                          <p className="mb-0">
                            {eventNameDetails[index]?.name}
                          </p>
                        )}
                        {eventNameDetails && (
                          <p className="mb-0">
                            {
                              eventNameDetails[index]?._embedded?.venues[0]
                                ?.city?.name
                            }
                          </p>
                        )}
                        {eventNameDetails && (
                          <p className="mb-0">
                            {eventNameDetails[index]?.dates?.start?.localTime
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
  );
};

export default SingleEventCard;
