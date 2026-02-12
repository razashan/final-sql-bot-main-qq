import React from "react";
import { Link } from "react-router-dom";

const ShadowButton = ({ text, onClick, active, route }) => {
  return (
    <>
      <Link to={route ? route : ""}>
        <button onClick={onClick} className="shadow_button">
          {text}
        </button>
      </Link>
    </>
  );
};

export default ShadowButton;
