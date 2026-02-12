import React from "react";

const HintBtn = ({ text, onClick }) => {
  return (
    <>
      <button onClick={onClick} className="hint_btn">
        {text}
      </button>
    </>
  );
};

export default HintBtn;
