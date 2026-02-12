import React from "react";
import { Link } from "react-router-dom";

const HoverButton = ({ text, route, onClick }) => {
  return (
    <Link to={route ? route : ""}>
      <div>
        <button onClick={onClick} className="hover_btn">
          {text}
        </button>
      </div>
    </Link>
  );
};

export default HoverButton;
