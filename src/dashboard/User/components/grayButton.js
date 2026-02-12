import React from "react";

const GrayButton = ({ text, onClick, active }) => {
  return (
    <>
      <button className="gray_button" onClick={onClick}>
        {text}
      </button>
    </>
  );
};

export default GrayButton;
