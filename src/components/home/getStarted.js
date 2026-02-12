import React from "react";
import StrokeButton from "../shared/strokeButton";
import HoverButton from "./hoverButton";

const GetStarted = () => {
  return (
    <>
      <div className="getstarted_banner">
        <div>
          <h1>Get Started Today</h1>
          <p>Don't leave success up to chance.</p>
          <HoverButton text={"Get Started"} route={"/user-dashboard"} />
        </div>
      </div>
    </>
  );
};

export default GetStarted;
