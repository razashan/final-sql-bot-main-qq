import React, { useState } from "react";
import { GRAPHICS } from "../assets";
import { TopBar } from "../components";
import Support from "./support";
import { Icon } from "@iconify/react";
import axios from "axios";
import { toast } from "react-toastify";

const ContactUs = ({ isSideMenuOpen, toggleSideMenu }) => {
  const [showContact, setShowContact] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    country: "",
    message: "",
  });
  const [formErrors, setFormErrors] = useState({
    name: "",
    email: "",
    phone: "",
    country: "",
    message: "",
  });

  const isProduction = process.env.NODE_ENV === "production";
  const apiUrlContactUs = isProduction
    ? process.env.REACT_APP_API_URL_POST_CONTACT_PROD
    : process.env.REACT_APP_API_URL_POST_CONTACT;

  const contactUs = async () => {
    try {
      if (!isFormValid()) {
        return;
      }

      await axios.post(apiUrlContactUs, formData);
      setFormErrors({
        name: "",
        email: "",
        phone: "",
        country: "",
        message: "",
      });
      setFormData({
        name: "",
        email: "",
        phone: "",
        country: "",
        message: "",
      });
      // You can handle success or any further actions here
      toast.success("Form submitted successfully!");

    } catch (error) {
      console.error("Error submitting form:", error);
      // Handle errors appropriately
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setFormErrors({
      ...formErrors,
      [name]: "",
    });
  };

  const isFormValid = () => {
    let valid = true;
    const newFormErrors = { ...formErrors };

    // Check each field for validation
    Object.entries(formData).forEach(([key, value]) => {
      if (value.trim() === "") {
        newFormErrors[key] = `${key.charAt(0).toUpperCase() + key.slice(1)
          } is required.`;
        valid = false;
      }
    });

    setFormErrors(newFormErrors);
    return valid;
  };

  return (
    <>
      <div>
        <TopBar
          heading={"Contact Us"}
          isSideMenuOpen={isSideMenuOpen}
          toggleSideMenu={toggleSideMenu}
          onClick={() => {
            setShowContact(false);
          }}
        />
      </div>

      <div className="ms-5 back">
        <Icon
          icon="ep:back"
          width="35"
          height="35"
          onClick={() => {
            setShowContact(false);
          }}
        />
      </div>
      <div className="contact_us_section">
        <div className="contact_us_form">
          <form>
            <h1>Contact us !</h1>

            <div className="inputs">
              <p>Enter Your Full Name</p>
              <input
                type="text"
                name="name"
                placeholder="Enter Full Name"
                value={formData.name}
                onChange={handleInputChange}
              />
              <p className="error-msg">{formErrors.name}</p>

              <p>Enter Your Email</p>
              <input
                type="email"
                name="email"
                placeholder="Enter email"
                value={formData.email}
                onChange={handleInputChange}
              />
              <p className="error-msg">{formErrors.email}</p>

              <p>Enter Your Phone Number</p>
              <input
                type="number"
                name="phone"
                placeholder="Enter Phone number"
                value={formData.phone}
                onChange={handleInputChange}
              />
              <p className="error-msg">{formErrors.phone}</p>

              <p>Country</p>
              <input
                type="text"
                name="country"
                placeholder="Enter country"
                value={formData.country}
                onChange={handleInputChange}
              />
              <p className="error-msg">{formErrors.country}</p>

              <p>Message</p>
              <textarea
                name="message"
                placeholder="Enter your message"
                value={formData.message}
                onChange={handleInputChange}
              />
              <p className="error-msg">{formErrors.message}</p>

              <p style={{ marginTop: -22, fontSize: 13 }}>
                By submitting this form, I confirm that I have read Query Flo
                Privacy Policy.
              </p>
            </div>

            <input
              type="button"
              value="Submit"
              className="submit_btn"
              onClick={contactUs}
            />
          </form>
        </div>

        <div className="contact_us_img">
          <img src={GRAPHICS.Contact_Us_Img2} alt="" />
        </div>
      </div>

      {/* {showContact ? (
        <>
       
        </>
      ) : (
        <>
          <Support showContact={showContact} setShowContact={setShowContact} />
        </>
      )} */}
    </>
  );
};

export default ContactUs;
