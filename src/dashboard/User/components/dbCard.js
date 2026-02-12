import React from "react";

function DbCard({ text, onClick }) {
  return (
    <div className="db_card" onClick={onClick}>
      <h1>{text}</h1>
    </div>
  );
}

export default DbCard;
