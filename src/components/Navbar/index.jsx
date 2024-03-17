import React, { useState, useEffect } from "react";
import { useFormCity } from "../../context/CityContext";
import { fetchEvents } from "../../eventsActions/eventsActions";
import "./navbar.css";

const Navbar = () => {
  const { formCity, setFormCity } = useFormCity();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [citySelected, setCitySelected] = useState(true);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const selectedCity = document.querySelector(
      'input[name="options"]:checked'
    );

    if (selectedCity) {
      setFormCity(selectedCity.id);
      setCitySelected(true);
      const offcanvasCity = document.getElementById("offcanvasCity");
      offcanvasCity.classList.remove("show");
      uncheckAllCheckboxes();
    } else {
      setCitySelected(false);
    }

    setFormSubmitted(true);
  };

  const fetchEventsWithUpdatedFormCity = async () => {
    try {
      const events = await fetchEvents(undefined, formCity);
      console.log("Events fetched:", events);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const uncheckAllCheckboxes = () => {
    const checkboxes = document.querySelectorAll('input[name="options"]');
    checkboxes.forEach((checkbox) => {
      checkbox.checked = false;
    });
  };

  useEffect(() => {
    if (formSubmitted && formCity.trim() !== "") {
      fetchEventsWithUpdatedFormCity();
    }
  }, [formCity, formSubmitted]);

  return (
    <>
      <nav className="navigation py-3 px-2 fixed-top container-xxl">
        <div className="brand-wraper d-flex justify-content-between">
          <div className="brand-logo text-primary">AAA</div>
          <div className="menu text-primary d-flex">
            <img
              className="uk-flag me-3"
              src="/images/uk_flag.svg"
              alt="United Kingdom Flag"
            />

            <a
              className="city"
              data-bs-toggle="offcanvas"
              href="#offcanvasCity"
              role="button"
              aria-controls="offcanvasCity"
            >
              <i className="fa-solid fa-location-dot me-2"></i>
              {formCity}
            </a>

            <div
              className="offcanvas offcanvas-end"
              data-bs-backdrop="false"
              tabIndex="-1"
              id="offcanvasCity"
              aria-labelledby="offcanvasCityLabel"
            >
              <div className="offcanvas-header">
                <h5
                  className="offcanvas-title text-uppercase"
                  id="offcanvasCityLabel"
                >
                  Select your city!
                </h5>
                <button
                  type="button"
                  className="btn-close text-reset"
                  data-bs-dismiss="offcanvas"
                  aria-label="Close"
                ></button>
              </div>
              <div className="offcanvas-body">
                <form onSubmit={handleFormSubmit}>
                  <div className="ps-0 mb-3 form-check">
                    <input
                      type="radio"
                      className="btn-check"
                      name="options"
                      id="London"
                      autoComplete="off"
                    />
                    <label className="btn btn-secondary" htmlFor="London">
                      London
                    </label>
                  </div>
                  <div className="ps-0 mb-3 form-check">
                    <input
                      type="radio"
                      className="btn-check"
                      name="options"
                      id="Manchester"
                      autoComplete="off"
                    />
                    <label className="btn btn-secondary" htmlFor="Manchester">
                      Manchester
                    </label>
                  </div>
                  <div className="ps-0 mb-3 form-check">
                    <input
                      type="radio"
                      className="btn-check"
                      name="options"
                      id="Liverpool"
                      autoComplete="off"
                    />
                    <label className="btn btn-secondary" htmlFor="Liverpool">
                      Liverpool
                    </label>
                  </div>
                  <div className="ps-0 mb-3 form-check">
                    <input
                      type="radio"
                      className="btn-check"
                      name="options"
                      id="Birmingham"
                      autoComplete="off"
                    />
                    <label className="btn btn-secondary" htmlFor="Birmingham">
                      Birmingham
                    </label>
                  </div>
                  <div className="ps-0 mb-3 form-check">
                    <input
                      type="radio"
                      className="btn-check"
                      name="options"
                      id="Bristol"
                      autoComplete="off"
                    />
                    <label className="btn btn-secondary" htmlFor="Bristol">
                      Bristol
                    </label>
                  </div>
                  <div className="ps-0 mb-3 form-check">
                    <input
                      type="radio"
                      className="btn-check"
                      name="options"
                      id="Leeds"
                      autoComplete="off"
                    />
                    <label className="btn btn-secondary" htmlFor="Leeds">
                      Leeds
                    </label>
                  </div>
                  {/* Add other city options */}
                  <button
                    type="submit"
                    className="btn btn-primary"
                    data-bs-dismiss="offcanvas"
                    aria-label="Close"
                  >
                    Submit
                  </button>
                  {!citySelected && (
                    <div className="container-xxl mt-3 ">
                      <div className="alert alert-danger fade-in" role="alert">
                        Select a city
                      </div>
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </nav>
      {/* Add message if no city selected */}
    </>
  );
};

export default Navbar;
