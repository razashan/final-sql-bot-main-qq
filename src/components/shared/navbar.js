import React, { useState } from "react";
import "../../style/main.scss";
import { Link, useNavigate } from "react-router-dom";
import Button from "./button";
import StrokeButton from "./strokeButton";
import { useLocation } from "react-router-dom";
import BarIcon from "../../assets/image/Bar_Icon.svg";
import logowhite from "../../assets/icons/Updated_Logo.png";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate("");

  const [isNavCollapsed, setIsNavCollapsed] = useState(false);

  const handleNavCollapse = () => {
    setIsNavCollapsed(!isNavCollapsed);
  };

  const handleNavClick = (path) => {
    navigate(path);
    setIsNavCollapsed(false);
  };

  //destructuring pathname from location
  const { pathname } = location;
  //Javascript split method to get the name of the path in arraay
  const splitLocation = pathname.split("/");

  return (
    <div>
      <nav class="navbar navbar-expand-lg navbar-dark p-0">
        <div class="container-fluid text-white nav_bar">
          <a class="navbar-brand text-white logo" href="/">
            <img src={logowhite} alt="" />
          </a>

          <button
            class="navbar-toggler shadow-none"
            type="button"
            onClick={handleNavCollapse}
            // data-bs-toggle="collapse"
            // data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded={isNavCollapsed}
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon text-white"></span>
          </button>

          <div
            class={`collapse navbar-collapse center_nav ${
              !isNavCollapsed ? "show" : ""
            }`}
            id="navbarSupportedContent"
          >
            <div className="links collapse navbar-collapse">
              <ul className="list navbar-nav me-auto mb-2 mb-lg-0"></ul>
            </div>

            <form class="d-flex buttons" role="search">
              <ul class="d-flex justify-content-center align-items-center gap-3">
                <li
                  style={{ cursor: "pointer" }}
                  class="cursor-pointer"
                  onClick={() => handleNavClick("/about")}
                >
                  About
                </li>

                <li
                  style={{ cursor: "pointer" }}
                  class="cursor-pointer"
                  onClick={() => handleNavClick("/pricing-page")}
                >
                  Pricing
                </li>
                <li
                  style={{ cursor: "pointer" }}
                  class="cursor-pointer"
                  onClick={() => handleNavClick("/partnership")}
                >
                  Partnership
                </li>
              </ul>
              <div className="regis-btn d-flex justify-content-center align-items-center gap-3">
                <StrokeButton
                  text="Create Account"
                  route={"/signup"}
                  onClick={() => setIsNavCollapsed(true)}
                />
                <Button
                  text="login"
                  route={"/login"}
                  onClick={() => setIsNavCollapsed(true)}
                />
              </div>
            </form>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
