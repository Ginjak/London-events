import React from "react";
import "./navbar.css";
const Navbar = () => {
  return (
    <>
      <nav className="navigation py-3 px-2 fixed-top container-xxl">
        <div className="brand-wraper d-flex justify-content-between">
          <div className="brand-logo text-primary">AAA</div>
          <div className="menu text-primary d-flex">
            <img
              className="uk-flag me-3"
              src="../../../public/images/uk_flag.svg"
              alt="Unted Kingdom Flag"
            />

            <a
              className="city"
              data-bs-toggle="offcanvas"
              href="#offcanvasExample"
              role="button"
              aria-controls="offcanvasExample"
            >
              <i className="fa-solid fa-location-dot me-2"></i>
              London
            </a>

            <div
              className="offcanvas offcanvas-end"
              data-bs-backdrop="false"
              tabIndex="-1"
              id="offcanvasExample"
              aria-labelledby="offcanvasExampleLabel"
            >
              <div className="offcanvas-header">
                <h5 className="offcanvas-title" id="offcanvasExampleLabel">
                  Offcanvas
                </h5>
                <button
                  type="button"
                  className="btn-close text-reset"
                  data-bs-dismiss="offcanvas"
                  aria-label="Close"
                ></button>
              </div>
              <div className="offcanvas-body">
                <div>
                  Some text as placeholder. In real life you can have the
                  elements you have chosen. Like, text, images, lists, etc.
                </div>
                <div className="dropdown mt-3">
                  <button
                    className="btn btn-secondary dropdown-toggle"
                    type="button"
                    id="dropdownMenuButton"
                    data-bs-toggle="dropdown"
                  >
                    Dropdown button
                  </button>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuButton"
                  >
                    <li>
                      <a className="dropdown-item" href="#">
                        Action
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Another action
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Something else here
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
