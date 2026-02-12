import React from "react";
import { GRAPHICS } from "../../assets";

const BenefitBanner = () => {
  return (
    <>
      <div className="benefit_banner">
        <div className="top_right">
          <img src={GRAPHICS.Benfit_Top_Right} />
        </div>

        <div className="bottom_left">
          <img src={GRAPHICS.Benfit_Bottom_Left} />
        </div>

        <h1>Benefits of Using Query Flo!</h1>

        <p>
          Ignite your learning with expert-crafted SQL mock interviews across
          various analytics domains. Ditch the frustration and embrace engaging,
          practice, targeted guidance, and confidence-boosting insights. Ace
          your interviews, using either our interactive coding environment or
          text to SQL code AI feature in one place.
        </p>

        <div className="cards">
          <div className="card">
            <img src={GRAPHICS.Watch_Icon} alt="" />

            <h2>Stop wasting hours googling</h2>

            <span className="pt-1">
              Practice with an extensive collection of SQL questions that mirror
              real-world interview challenges using data from various domains
              like marketing, product, healthcare, retail, finance,hr much more.
              Receive tailored feedback based on your performance.
            </span>
          </div>

          <div className="card">
            <img src={GRAPHICS.Currency_Icon} alt="" />

            <h2> Ace your SQL interview</h2>

            <span>
              Tackle interview-caliber SQL questions designed by industry
              experts to ensure you're prepared for any scenario. Walk into
              interviews with the skills and confidence to showcase your SQL
              expertise and leave a lasting impression.
            </span>
          </div>

          <div className="card">
            <img src={GRAPHICS.Increase_Icon} alt="" />

            <h2>Interactive Coding Environment</h2>

            <span className="">
              Write and execute SQL queries within a user-friendly interface to
              practice hands-on and reinforce your skills. Set the difficulty
              level and tailor practice sessions to align with your specific
              goals and experience. Monitor & visualize your progress with
              analytics.
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default BenefitBanner;
