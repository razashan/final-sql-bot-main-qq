import React from "react";
import { Link } from "react-router-dom";

function StrokeButton({ text, active, route, onClick }) {
  return (
    <Link to={route ? route : ""}>
      <div>
        <button
          onClick={onClick}
          className={`${active ? "stroke_active" : "stroke_button"}`}
        >
          {text}
        </button>
      </div>
    </Link>
  );
}

export default StrokeButton;
