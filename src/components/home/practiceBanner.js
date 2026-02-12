import React from "react";
import { GRAPHICS } from "../../assets";
// import StrokeButton from "../shared/strokeButton";
import HoverButton from "./hoverButton";
import video from "../../assets/vedio/queryflovideo.mp4";
import WhiteVectorRight from '../../assets/image/partnership/vector-right.webp'


const PracticeBanner = () => {
  return (
    <>
      <div className="practice_banner">
        <h1>Practice SQL coding for technical Interviews</h1>

        <div className="practice_top_right">
          {/* <img src={GRAPHICS.Practice_Top_Right} /> */}
        </div>

        <div className="bottom_left">
          <img src={WhiteVectorRight} alt="bottom-deisgn" className="bottom-desing" />
        </div>
        <p>
          Tired of endless textbooks and dry tutorials? QueryFlo unique
          SQL-to-text functionality transforms intricate code into clear,
          comprehensible explanations, revealing the logic and insights behind
          each statement. With this feature, every line of code becomes a
          conversation, inviting you to explore data's untold stories.
        </p>

        <div className="video_   text-center  ">
          <video autoPlay muted loop playsInline className=" ">
            <source src={video} type="video/mp4" />
          </video>
        </div>
        {/* <StrokeButton text={"Get Started"} /> */}
        <HoverButton text={"Get Started"} route={"/user-dashboard"} />
      </div>
    </>
  );
};

export default PracticeBanner;
