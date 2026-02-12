import React from "react";

const SupportCard = ({ heading, content, link, onClick }) => {
  return (
    <>
      <div className="support_card">
        <h1>{heading}</h1>

        <p>{content}</p>

        <a href="#" onClick={onClick}>
          {link}
        </a>
      </div>
    </>
  );
};

export default SupportCard;
