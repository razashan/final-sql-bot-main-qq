import React from "react";
import StrokeButton from "../shared/strokeButton";
import Button from "../shared/button";
import { GRAPHICS } from "../../assets";

import heromImg from '../../assets/image/home/homeheroimg.webp'

const Learn = () => {
  return (
    <div>
      <div className="learn_section">
        <div className="top">
          <div className="content">
            <div>
              {" "}
              <h1>
                Ace SQL Interview
                <span>with Query Flo</span>
              </h1>
              <p>
                Crunch your technical interviews with expert-curated SQL
                questions covering every analytics domain. Get instant feedback
                & recommendation on your code, track your progress and walk into
                any interview with confidence. Use our AI feature to generate
                SQL code tailored to any data analytics domain.
              </p>
            </div>

            <div className="buttons">
              <StrokeButton
                text="Get Started for free!"
                active={true}
                route={"/user-dashboard"}
              />
              {/* <div className="sql_pad_btn">
                <Button text="SQL Pads" active={true} />
              </div> */}
            </div>
          </div>
          {/* <img src={GRAPHICS.Learn_img} alt="learn" /> */}
          <img src={heromImg} alt="learn" />


        </div>

        <div className="bottom">
          <p>
            Trusted by talents with <a href="#"> $240K+ compensation offers</a>{" "}
            at
          </p>
          <div className="social_links">
            <a href="#" target="_blank">
              <img src={GRAPHICS.Learn_Google} alt="Learn Google" />
            </a>
            <a href="#" target="_blank">
              <img src={GRAPHICS.Amazon} alt="Amazon" />
            </a>
            <a href="#" target="_blank">
              <img src={GRAPHICS.Meta} alt="Meta" />
            </a>
            <a href="#" target="_blank">
              <img src={GRAPHICS.IYA} alt="IYA" />
            </a>
            <a href="#" target="_blank">
              <img src={GRAPHICS.Apple} alt="Apple" />
            </a>
            <a href="#" target="_blank">
              <img src={GRAPHICS.Microsoft} alt="MicroSoft" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Learn;
