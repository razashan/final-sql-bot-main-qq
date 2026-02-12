import React, { useState } from "react";
import { GRAPHICS } from "../assets";
import { TopBar } from "../components";
import axios from "axios";
import { toast } from "react-toastify";

function ReportBugs({ isSideMenuOpen, toggleSideMenu }) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [bugDescription, setBugDescription] = useState("");
  const [bugImage, setBugImage] = useState(null);
  const [errors, setErrors] = useState({});

  const isProduction = process.env.NODE_ENV === "production";
  const apiUrlReportBugs = isProduction
    ? process.env.REACT_APP_API_URL_POST_BUG_PROD
    : process.env.REACT_APP_API_URL_POST_BUG;

  const validateForm = () => {
    let valid = true;
    const newErrors = {};

    if (!fullName.trim()) {
      newErrors.fullName = "Full Name is required";
      valid = false;
    }

    if (!email.trim()) {
      newErrors.email = "Email is required";
      valid = false;
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        newErrors.email = "Invalid email format";
        valid = false;
      }
    }

    if (!bugDescription.trim()) {
      newErrors.bugDescription = "Bug Description is required";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };


  const submitReport = async () => {
    try {
      if (!validateForm()) {
        return;
      }

      const formData = new FormData();
      formData.append("name", fullName);
      formData.append("email", email);
      formData.append("bugDescription", bugDescription);
      if (bugImage) {
        formData.append("bugImage", bugImage);
      }


      await axios.post(apiUrlReportBugs, formData);

      // Show success toast
      toast.success("Bug report submitted successfully!", "success");

      // Clear the form and errors
      setFullName("");
      setEmail("");
      setBugDescription("");
      setBugImage(null);
      setErrors({});
    } catch (error) {
      // Handle errors, show an error toast if needed
      console.error("Error submitting bug report:", error);
      toast.success("An error occurred. Please try again later.", "error");
    }
  };

  return (
    <div>
      <div>
        <TopBar
          heading={"Report Bugs"}
          isSideMenuOpen={isSideMenuOpen}
          toggleSideMenu={toggleSideMenu}
        />
      </div>
      <div className="contact_us_section">
        <div className="contact_us_form">
          <form>
            <h1>Report Bugs </h1>

            <div className="inputs">
              <p>Enter Your Full Name</p>
              <input
                type="text"
                placeholder="Enter Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
              {errors.fullName && (
                <p style={{ color: "red", fontWeight: "normal" }}>
                  {errors.fullName}
                </p>
              )}

              <p>Enter Your Email</p>
              <input
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && (
                <p style={{ color: "red", fontWeight: "normal" }}>
                  {errors.email}
                </p>
              )}

              <p>Bugs Description</p>
              <textarea
                placeholder="Enter bug description"
                value={bugDescription}
                onChange={(e) => setBugDescription(e.target.value)}
                cols="30"
                rows="5"
              ></textarea>
              {errors.bugDescription && (
                <p style={{ color: "red", fontWeight: "normal" }}>
                  {errors.bugDescription}
                </p>
              )}

              <p>Choose File</p>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setBugImage(e.target.files[0])}
              />
            </div>

            <input
              type="button"
              value="Submit"
              className="submit_btn"
              onClick={submitReport}
            />
          </form>
        </div>

        <div className="contact_us_img">
          {/* <img src={GRAPHICS.Contact_Us_Img2} alt="" /> */}
        </div>
      </div>
    </div>
  );
}

export default ReportBugs;
