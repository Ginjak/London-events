import React, { useEffect, useState } from "react";
import "./search.css";
import { fetchEventsByInput } from "../../../eventsActions/eventsActions";

const Search = () => {
  const [inputValue, setInputValue] = useState("");
  const [tempInputValue, setTempInputValue] = useState("");
  const [allEvents, setAllEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState();

  const getInputValue = (e) => {
    console.log(e.target.value);
    setInputValue(e.target.value);
  };

  function filterByPropertyName(arr, word) {
    const uniqueNames = new Set(); // Set to store unique names
    return arr.filter((item) => {
      // Check if the property name contains the word "pink" and if the name is not a duplicate
      if (item.name.toLowerCase().includes(word.toLowerCase())) {
        if (!uniqueNames.has(item.name.toLowerCase())) {
          // Check if the name is not already encountered
          uniqueNames.add(item.name.toLowerCase()); // Add the name to the set
          return true; // Return true to keep the item
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
    // if (allEvents && allEvents.length > 0 && inputValue.length > 3) {
    //   const filteredData = filterByPropertyName(allEvents, inputValue);
    //   console.log("All events array filtered ", filteredData);
    // }
  });

  useEffect(() => {
    const fetchDataAndFilter = async () => {
      if (allEvents.length > 0 && inputValue.length > 3) {
        const filteredData = await filterByPropertyName(allEvents, inputValue);
        console.log("All events array filtered ", filteredData);
        setFilteredEvents(filteredData); // setFilteredEvents after filteredData is fetched
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
              {filteredEvents &&
                inputValue.length > 3 &&
                filteredEvents.map((event, index) => (
                  <p className="text-white" key={index}>
                    {event.name}
                  </p>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Search;
