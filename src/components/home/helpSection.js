import React from "react";
import { GRAPHICS } from "../../assets";
import HelpCard from "./helpCard";
import UpdatedHelpCard from "./updatedHelpCard";

import { DATA } from "../../utilis/mock";

function HelpSection() {
  return (
    <div>
      <div className="help_section">
        <div className="left_img">
          <img src={GRAPHICS.Help_Left_Img} />
        </div>
        <div className="content">
          <div className="content_top">
            <h1>
              How we can
              <span> help you!</span>
            </h1>
            <p>
              With QueryFlo, you're not just learning, you're preparing to ace
              those interviews and excel in your analytics career. Our
              professional AI-Powered code generation can help you understand
              complex SQL in simple English. Tailored for both beginners and
              seasoned professionals, our interactive web application offers a
              unique hands-on approach to mastering SQL interview questions.
            </p>
          </div>
          <div className="content_bottom">
            {DATA.map((data) => {
              return (
                <>
                  <HelpCard
                    heading={data.heading}
                    details={data.details}
                    img={data.img}
                    order={data.order}
                  />
                </>
              );
            })}
          </div>
        </div>
        <div className="right_img">
          <img src={GRAPHICS.Help_RIght_Img} />
        </div>
      </div>
    </div>
  );
}

export default HelpSection;
