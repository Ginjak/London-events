import React, { useEffect, useState, useRef } from "react";
import "./search.css";
import { fetchEventsByInput } from "../../../eventsActions/eventsActions";
import { imageSizeApi } from "../../../eventsActions/utilityFunctions";
import EventsResultsCards from "../../EventsResultsCards";
import { useEventId } from "../../../context/EventIdContext";

const Search = () => {
  const [inputValue, setInputValue] = useState("");
  const [tempInputValue, setTempInputValue] = useState("");
  const [allEvents, setAllEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState();
  const [filteredEventsByName, setFilteredEventsByName] = useState("");
  const [loading, setLoading] = useState(false);
  const [formSubmit, setFormSubmit] = useState(false);
  const { eventId, setEventId } = useEventId();
  const [displayEvents, setDisplayEvents] = useState(20);
  const [renderEvents, setRenderEvents] = useState(8);
  const [hasRendered, setHasRendered] = useState(false);
  const resultsRef = useRef(null);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormSubmit(true);
    setInputValue("");
    setTempInputValue("");
    setHasRendered(false);
  };

  const getInputValue = (e) => {
    console.log(e.target.value);
    setInputValue(e.target.value);
  };

  const loadMore = () => {
    setDisplayEvents(displayEvents + 8);
    setRenderEvents(renderEvents + 8);
  };

  const getEventId = (eventId) => {
    setEventId(eventId);
  };

  const scrollToResultsSection = () => {
    if (resultsRef.current && formSubmit) {
      resultsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  let dataFetchInfo;
  if (loading && allEvents !== undefined && inputValue.length === 4) {
    dataFetchInfo = (
      <div className="search-loading-wraper d-flex align-items-center">
        <div className="spinner-border text-light" role="status"></div>
        <p className="mb-0 ms-2">Fetching data...</p>
      </div>
    );
  } else if (loading && allEvents === undefined) {
    dataFetchInfo = (
      <div className="search-loading-wraper d-flex align-items-center">
        <p className="mb-0 ms-2">No results...</p>
      </div>
    );
  }

  function filterByName(arr, word) {
    return arr.filter((item) => {
      return item.name.toLowerCase().includes(word.toLowerCase());
    });
  }

  function filterByPropertyName(arr, word) {
    const uniqueNames = new Set(); // Set to store unique names
    return arr.filter((item) => {
      if (item.name.toLowerCase().includes(word.toLowerCase())) {
        if (!uniqueNames.has(item.name.toLowerCase())) {
          uniqueNames.add(item.name.toLowerCase());
          return true;
        }
      }
      return false; // Return false to filter out duplicates or items without the name property
    });
  }

  useEffect(() => {
    const fetchApiData = async () => {
      if (inputValue.length === 4) {
        setTempInputValue(inputValue);
      }
      if (
        inputValue.length < 4 &&
        inputValue !== tempInputValue.substring(0, inputValue.length)
      ) {
        setAllEvents("");
      }
      if (inputValue.length === 4 && inputValue !== tempInputValue) {
        setLoading(true);
        console.log(inputValue);
        const fullEvents = await fetchEventsByInput(inputValue);
        const eventsByName = await filterByName(fullEvents, inputValue);
        setAllEvents(eventsByName);
      }
    };
    fetchApiData();
  });

  useEffect(() => {
    const fetchDataAndFilter = async () => {
      if (
        inputValue.length < 4 &&
        inputValue !== tempInputValue.substring(0, inputValue.length)
      ) {
        setFilteredEvents("");
      }
      if (allEvents?.length > 0 && inputValue?.length > 3) {
        const filteredData = await filterByPropertyName(allEvents, inputValue);
        console.log("All events array filtered ", filteredData);
        setFilteredEvents(filteredData);
        setLoading(false);
        const filteredDataByName = await filterByName(allEvents, inputValue);
        console.log("testing data", filteredDataByName);
        setFilteredEventsByName(filteredDataByName);
      }
    };

    fetchDataAndFilter();
  }, [allEvents, inputValue]);

  useEffect(() => {
    if (formSubmit && !hasRendered) {
      setHasRendered(true);
      scrollToResultsSection();
    }
  }, [formSubmit, hasRendered]);

  useEffect(() => {
    if (hasRendered) {
      scrollToResultsSection();
    }
  }, [hasRendered]);

  return (
    <>
      <div id="search-page">
        <div className="hero-wraper position-relative">
          <div className="search-hero container-xxl d-flex justify-content-center align-items-center">
            <div className="form-wraper position-relative d-flex">
              <form className="position-relative" onSubmit={handleFormSubmit}>
                <input
                  id="search-input"
                  className="py-2 px-4"
                  type="text"
                  placeholder="Search for event..."
                  value={inputValue}
                  onChange={getInputValue}
                />

                <button
                  className="search-submit-btn"
                  type="submit"
                  disabled={inputValue.length < 4}
                  to="search-main-results"
                  onClick={scrollToResultsSection}
                >
                  <i className="fa-solid fa-magnifying-glass"></i>
                </button>

                {allEvents?.length > 0 && inputValue?.length > 3 && (
                  <label
                    className="m-0 all-event-length d-flex flex-column justify-content-center align-items-center"
                    htmlFor="search-input"
                  >
                    <span>All events </span>
                    {inputValue.length === 4 ? (
                      <span>{allEvents.length}</span>
                    ) : (
                      inputValue.length > 4 && (
                        <span>{filteredEventsByName.length}</span>
                      )
                    )}
                  </label>
                )}
              </form>
              <div className="result-wraper px-2">
                {dataFetchInfo}
                {filteredEvents &&
                  filteredEvents.length > 0 &&
                  inputValue.length > 3 &&
                  !loading && (
                    <>
                      <h4 className="result-heading m-0">Suggestions</h4>

                      <div className="results-event-wraper">
                        {filteredEvents &&
                          inputValue.length > 3 &&
                          filteredEvents.slice(0, 10).map((event) => (
                            <div
                              className="result d-flex"
                              key={event.id}
                              onClick={() => setInputValue(event.name)}
                            >
                              <img
                                className="result-img"
                                src={imageSizeApi(event.images, 100)}
                                alt={`${event.name} image`}
                              />
                              <div className="result-details d-flex flex-column justify-content-between">
                                <h5 className="result-title m-0">
                                  {event.name}
                                </h5>
                                <p className="genre m-0">
                                  {event.classifications[0].genre.name !==
                                  "Undefined"
                                    ? event.classifications[0].genre.name
                                    : "Music"}
                                </p>
                              </div>
                            </div>
                          ))}
                      </div>
                    </>
                  )}
              </div>
            </div>
          </div>
        </div>
        <div id="search-main-results" ref={resultsRef}>
          <div className="container-xxl">
            {formSubmit && (
              <EventsResultsCards
                events={filteredEventsByName}
                loadMore={loadMore}
                renderEvents={renderEvents}
                getEventId={getEventId}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Search;
