import React from "react";

function DbButton({ text, onClick }) {
  return (
    <div className="db_button">
      <button onClick={onClick}>{text}</button>
    </div>
  );
}

export default DbButton;
