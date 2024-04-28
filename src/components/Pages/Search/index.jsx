import React, { useEffect, useState } from "react";
import "./search.css";
import { fetchEventsByInput } from "../../../eventsActions/eventsActions";
import { imageSizeApi } from "../../../eventsActions/utilityFunctions";

const Search = () => {
  const [inputValue, setInputValue] = useState("");
  const [tempInputValue, setTempInputValue] = useState("");
  const [allEvents, setAllEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState();
  const [loading, setLoading] = useState(false);

  const getInputValue = (e) => {
    console.log(e.target.value);
    setInputValue(e.target.value);
  };

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
      if (inputValue.length === 4 && inputValue !== tempInputValue) {
        console.log(inputValue);
        const fullEvents = await fetchEventsByInput(inputValue);
        setAllEvents(fullEvents);
      }
    };
    fetchApiData();
  });

  useEffect(() => {
    const fetchDataAndFilter = async () => {
      if (allEvents.length > 0 && inputValue.length > 3) {
        setLoading(true);
        const filteredData = await filterByPropertyName(allEvents, inputValue);
        console.log("All events array filtered ", filteredData);
        setFilteredEvents(filteredData);
        setLoading(false);
      }
    };

    fetchDataAndFilter();
  }, [allEvents, inputValue]);

  return (
    <>
      <div id="search-page">
        <div className="hero-wraper position-relative">
          <div className="search-hero container-xxl d-flex justify-content-center align-items-center">
            <div className="form-wraper position-relative d-flex">
              <form className="position-relative">
                <input
                  className="py-2 px-4"
                  type="text"
                  placeholder="Search for event..."
                  onChange={getInputValue}
                />
                <button className="search-submit-btn" type="submit">
                  <i className="fa-solid fa-magnifying-glass"></i>
                </button>
              </form>
              <div className="result-wraper">
                {loading && <p>Test</p>}
                {filteredEvents && inputValue.length > 3 && (
                  <h4 className="result-heading m-0">Suggestions</h4>
                )}
                {filteredEvents &&
                  inputValue.length > 3 &&
                  filteredEvents.map((event) => (
                    <>
                      <div className="result d-flex" key={event.id}>
                        <img
                          className="result-img"
                          src={imageSizeApi(event.images, 100)}
                          alt={`${event.name} image`}
                        />
                        <div className="result-details d-flex flex-column justify-content-between">
                          <h5 className="result-title m-0">{event.name}</h5>
                          <p className="genre m-0">
                            {event.classifications[0].genre.name}
                          </p>
                        </div>
                      </div>
                    </>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Search;
