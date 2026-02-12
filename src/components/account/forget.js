import React, { useState } from "react";
import "./account.css";
import googleicon from "../../assets/icons/google_icon.png";
import facebookicon from "../../assets/icons/facebook_icon.png";
import { GRAPHICS } from "../../assets";
import { useNavigate } from "react-router-dom";
import { ForgotPassword } from "../../firebase/firebase";
import { toast } from "react-toastify";

function Forget() {
  const navigate = useNavigate();
  const [email, setEmail] = useState(""); // Initialize email state
  const [emailIsEmpty, setEmailIsEmpty] = useState(false);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setEmailIsEmpty(false);
  }; // Update the email state when the input changes  };

  const handleForgotPassword = async (event) => {
    event.preventDefault();
    if (!email.trim()) {
      toast.error("Email is empty");
      setEmailIsEmpty(true);
      return;
    }
    await ForgotPassword(email);
  };

  return (
    <div>
      <div className="sign-up-wrapper">
        <div className="top_right">
          <img src={GRAPHICS.Account_Top_Right} alt="Top Right Graphic" />
        </div>

        <div className="bottom_right">
          <img src={GRAPHICS.Account_Bottom_Right} alt="Bottom Right Graphic" />
        </div>

        <div className="account_elips">
          <img src={GRAPHICS.Account_Elips} alt="Account Elips Graphic" />
        </div>
        <div className="forget">
          <h1 className="forget_heading">forget password</h1>
          <form>
            <div className="sign-up-input">
              <label>
                <input
                  className={emailIsEmpty ? "inputEmpty" : ""}
                  type="email"
                  placeholder="Enter Email"
                  value={email} // Bind the input value to the email state
                  onChange={handleEmailChange} // Update email state when the input changes
                />
              </label>
              <button
                style={{
                  marginBottom: "4px",
                }}
                onClick={handleForgotPassword} // Call handleForgotPassword function on button click
                className="signup-button"
              >
                Get password
              </button>
              <button
                style={{
                  marginTop: "12px",
                }}
                className="signup-button  "
                onClick={() => navigate("/login")}
              >
                Back
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Forget;
