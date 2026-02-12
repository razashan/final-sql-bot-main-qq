import React, { useEffect, useState } from "react";

import Marquee from "react-fast-marquee";
import { Typewriter } from "react-simple-typewriter";

import "./topbar.scss";

const Topbar = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 2 || "10",
    hours: 22 || "48",
    minutes: 20 || "60",
    seconds: 31 || "60",
  });

  useEffect(() => {
    const totalSeconds =
      timeLeft.days * 86400 +
      timeLeft.hours * 3600 +
      timeLeft.minutes * 60 +
      timeLeft.seconds;

    const endTime = Date.now() + totalSeconds * 1000;

    const interval = setInterval(() => {
      const now = Date.now();
      const remaining = Math.max(0, Math.floor((endTime - now) / 1000));

      const d = Math.floor(remaining / 86400);
      const h = Math.floor((remaining % 86400) / 3600);
      const m = Math.floor((remaining % 3600) / 60);
      const s = remaining % 60;

      setTimeLeft({ days: d, hours: h, minutes: m, seconds: s });

      if (remaining === 0) clearInterval(interval);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const time = `${timeLeft.days}d ${timeLeft.hours}h ${timeLeft.minutes}m
                ${timeLeft.seconds}s`;

  // const textData = [
  //   { text: "Save 20% off all plans with welcome20" },
  //   { text: "Save 20% off all plans with welcome20" },
  //   { text: "Save 20% off all plans with welcome20" },
  //   { text: "Save 20% off all plans with welcome20" },
  //   { text: "Save 20% off all plans with welcome20" },
  // ];

  return (
    <>
      <div className="home_topbar">
        <div className="scroll d-flex justify-content-center align-items-center">
          <Typewriter
            words={[
              `Save 20% off all plans with welcome20 | 
              Sale ends in ${time}`,
            ]}
            loop={0}
            cursor
            cursorStyle=""
            typeSpeed={100}
            deleteSpeed={50}
            delaySpeed={100}
          />

          {/* <div className="sale-timer">
            <p>
              {" "}
              Sale ends in{" "}
              <span class="timer" id="countdown">
                {time}
              </span>
            </p>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default Topbar;
