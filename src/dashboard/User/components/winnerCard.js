import React from "react";
import { GRAPHICS } from "../assets";

const WinnerCard = ({name,noOfQuestions }) => {
  return (
    <>
      <div className="winner_card">
        <div className="name">
          {/* <span>{serial_no} </span> */}
          <span>{name}</span>
        </div>

        <div className="icons">
          {/* <img src={icon} /> */}
          <span>{noOfQuestions}</span>
          {/* <img src={btn} /> */}
        </div>
      </div>
    </>
  );
};

export default WinnerCard;
