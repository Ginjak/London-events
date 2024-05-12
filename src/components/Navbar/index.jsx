import React, { useState, useEffect } from "react";
import { useFormCity } from "../../context/CityContext";
import { Link } from "react-router-dom";
import { fetchEvents } from "../../eventsActions/eventsActions";
import "./navbar.css";

const Navbar = () => {
  const { formCity, setFormCity } = useFormCity();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [citySelected, setCitySelected] = useState(true);
  const [mobilemenu, setMobileMenu] = useState(false);
  const [mobileIsVisible, setMobileIsVisible] = useState(false);

  const mobileMenuToggle = () => {
    setMobileIsVisible(!mobileIsVisible);
  };

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
      <nav id="main-nav" className="navigation fixed-top">
        <div className="nav-wraper py-3 px-2  container-xxl position-relative">
          <div className="brand-wraper d-flex justify-content-between">
            <div className="brand">
              <Link to="/" className="brand-logo text-primary">
                <img
                  className="logo"
                  src="/images/search_image.webp"
                  alt="UK Events Logo"
                />
              </Link>
            </div>
            <div id="main-nav-a" className="nav-city-wraper d-flex">
              <div className="navigation-main-menu d-flex align-items-center">
                <div className="large-nav d-none d-md-block">
                  <Link className="menu-item me-3" to="/search">
                    Search
                  </Link>
                  <Link className="menu-item me-3" to="/contact">
                    Contact
                  </Link>
                  <Link className="menu-divider me-3"></Link>
                </div>
                <div className="mobile-navigation-wraper d-block d-md-none">
                  <div
                    className={`hamburger-menu ${
                      mobileIsVisible ? "clicked" : ""
                    }`}
                    onClick={mobileMenuToggle}
                  >
                    <div className="hamburger-line"></div>
                  </div>
                </div>
              </div>
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
              </div>
              <div
                className="offcanvas offcanvas-end"
                data-bs-backdrop="false"
                tabIndex="-1"
                data-bs-scroll="true"
                id="offcanvasCity"
                aria-labelledby="offcanvasCityLabel"
              >
                <div className="offcanvas-header mt-4">
                  <h5 className="offcanvas-title" id="offcanvasCityLabel">
                    Choose your city!
                  </h5>
                  <button
                    type="button"
                    className="btn-close btn-close-white text-reset"
                    data-bs-dismiss="offcanvas"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="offcanvas-body">
                  <form onSubmit={handleFormSubmit}>
                    <div className="ps-0 mb-2 form-check">
                      <input
                        type="radio"
                        className="btn-check"
                        name="options"
                        id="London"
                        autoComplete="off"
                      />
                      <label className="btn" htmlFor="London">
                        London
                      </label>
                    </div>
                    <div className="ps-0 mb-2 form-check">
                      <input
                        type="radio"
                        className="btn-check"
                        name="options"
                        id="Manchester"
                        autoComplete="off"
                      />
                      <label className="btn" htmlFor="Manchester">
                        Manchester
                      </label>
                    </div>
                    <div className="ps-0 mb-2 form-check">
                      <input
                        type="radio"
                        className="btn-check"
                        name="options"
                        id="Liverpool"
                        autoComplete="off"
                      />
                      <label className="btn" htmlFor="Liverpool">
                        Liverpool
                      </label>
                    </div>
                    <div className="ps-0 mb-2 form-check">
                      <input
                        type="radio"
                        className="btn-check"
                        name="options"
                        id="Birmingham"
                        autoComplete="off"
                      />
                      <label className="btn" htmlFor="Birmingham">
                        Birmingham
                      </label>
                    </div>
                    <div className="ps-0 mb-2 form-check">
                      <input
                        type="radio"
                        className="btn-check"
                        name="options"
                        id="Bristol"
                        autoComplete="off"
                      />
                      <label className="btn" htmlFor="Bristol">
                        Bristol
                      </label>
                    </div>
                    <div className="ps-0 mb-2 form-check">
                      <input
                        type="radio"
                        className="btn-check"
                        name="options"
                        id="Leeds"
                        autoComplete="off"
                      />
                      <label className="btn" htmlFor="Leeds">
                        Leeds
                      </label>
                    </div>
                    {/* Add other city options */}
                    <button
                      type="submit"
                      className="offcanvas-submit"
                      data-bs-dismiss="offcanvas"
                      aria-label="Close"
                    >
                      Let's go
                    </button>
                    {/* {!citySelected && (
                    <div className="container-xxl mt-3 ">
                      <div className="alert alert-danger fade-in" role="alert">
                        Select a city
                      </div>
                    </div>
                  )} */}
                  </form>
                </div>
              </div>
            </div>
          </div>

          <div
            className={`mobile-menu-wraper p-2 ${
              mobileIsVisible ? "show" : "hide"
            }`}
          >
            <Link className="menu-item me-3" to="/search">
              Search
            </Link>
            <Link className="menu-item me-3" to="/contact">
              Contact
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
