import React from "react";
import Button from "../shared/button";
import ShadowButton from "../shared/shadowButton";
import DateObject from "react-date-object";
const Contact = () => {
  var date = new DateObject();
  return (
    <>
      <div className="contact_us">
        <span className="upskill">UPSKILL FOR A BETTER FUTURE</span>

        <h1>Request More Information</h1>

        <p>
          We're Excited to Hear Your Queries and Guide You Through the World of
          Data Excellence.
        </p>

        {/* <div> */}
        <ShadowButton
          text={"Contact Us"}
          route={"/contactus"}
          onClick={() => {}}
        />
        {/* </div> */}

        <span>© {date.year}, LLC</span>
      </div>
    </>
  );
};

export default Contact;
