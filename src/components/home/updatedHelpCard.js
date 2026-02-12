import React from "react";

function UpdatedHelpCard({ heading, details, img, order }) {
  return (
    <div>
      <div className="updated_help_card">
        <div className="updated_help_card_content">
          <h1>{heading}</h1>
          <p>{details}</p>
        </div>
        <div className="updated_help_card_img">
          <img src={img} />
        </div>
      </div>
    </div>
  );
}

export default UpdatedHelpCard;
