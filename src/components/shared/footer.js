import React from "react";
import "../../style/main.scss";
import { GRAPHICS } from "../../assets";
import logowhite from "../../assets/icons/Updated_Logo-removebg-preview copy.png";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <>
      <div  className="footer">
        <div className="footer_logo">
          <a href="/"> {/* <span className="logo">Query Flo</span> */}</a>

          <img src={logowhite} alt="" />
        </div>

        <div className="footer_center">
          <ul className="links">
            <li>
              <Link to="/privacy">
                <a href="">Privacy Policy</a>
              </Link>
            </li>

            <li>
              <Link to="/refund">
                <a href="">Refund Policy</a>
              </Link>
            </li>

            <li>
              <Link to="/terms">
                <a href=""> Terms & Conditions</a>
              </Link>
            </li>

            <li>
              <Link to="/data-privacy">
                <a href=""> Data Privacy</a>
              </Link>
            </li>

            <li>
              <Link to="/contactus">
                <a href="">Contact Us</a>
              </Link>
            </li>
          </ul>
        </div>

        <div className="social_links">
          <a href="https://discord.com/" target="_blank">
            <img src={GRAPHICS.Discord} alt="Discord" />
          </a>

          <a href="https://www.instagram.com/" target="_blank">
            <img src={GRAPHICS.Instagram} alt="Instgram" />
          </a>

          <a href="https://www.facebook.com/" target="_blank">
            <img src={GRAPHICS.Facebook} alt="Facebook" />
          </a>

          <a href="https://twitter.com/" target="_blank">
            <img src={GRAPHICS.Twitter} alt="Twitter" />
          </a>
        </div>
      </div>
    </>
  );
};

export default Footer;
