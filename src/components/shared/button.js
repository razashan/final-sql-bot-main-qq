import React from "react";
import { Link } from "react-router-dom";

const Button = ({ text, onClick, active, route, join }) => {
  return (
    <>
      <Link to={route ? route : ""}>
        <button
          onClick={onClick}
          className={`${
            active ? "active_button" : join ? "join_btn" : "button"
          }`}
        >
          {text}
        </button>
      </Link>
    </>
  );
};

export default Button;
