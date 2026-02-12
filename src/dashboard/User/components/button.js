import React from "react";
import leftArrow from '../assets/icons/Arrow_Down_Mini.png'

const Button = ({
  text,
  onClick,
  active,
  logout,
  guidebtn,
  guideleft,
  guideright,
}) => {
  return (
    <>
      <button
        className={`${
          active
            ? "custom_btn_active"
            : logout
            ? "logout_btn"
            : guidebtn
            ? "guide-btn"
            : "custom_btn"
        } `}
        onClick={onClick}
      >
        {guideleft && <img src='/icons/left-arrow.svg' alt="lef-arrow" />}
        {text}
        {guideright && <img src="/icons/right-arrow.svg" alt="right-arrow" />}
      </button>
    </>
  );
};

export default Button;
