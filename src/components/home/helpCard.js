import React from "react";
import { GRAPHICS } from "../../assets";
function HelpCard({ heading, details, img, order }) {
  return (
    <div>
      <div className="help_card" style={order ? {} : { marginTop: 20 }}>
        <div className="help_card_content" style={order ? { order: 2 } : {}}>
          <h1>{heading}</h1>
          <p>{details}</p>
        </div>
        <div className="help-card_img" style={order ? { order: 1 } : {}}>
          <img src={img} />
        </div>
      </div>
    </div>
  );
}

export default HelpCard;
