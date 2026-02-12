import { React, useEffect } from "react";
import "./partnership.scss";
import Navbar from "../../components/shared/navbar";
import Footer from "../../components/shared/footer";

const PartnershipContact = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="contactus_main">
      <Navbar />

      <div className="contact-us">
        <div className="contact_us_section">
          <div className="partner_form">
            <form>
              <h1>Partnership </h1>

              <div className="inputs">
                <div
                  className="input-box-wrapper"
                  style={{ display: "flex", width: "100%", gap: "20px" }}
                >
                  <div className="w-50 innerDiv">
                    <p>Organization/Institution Name</p>
                    <input
                      type="text"
                      name="name"
                      placeholder="Organization/Institution Name"
                    />
                  </div>

                  <div className="w-50  innerDiv">
                    <p> Contact Person Name</p>
                    <input
                      type="text"
                      name="name"
                      placeholder=" Contact Person Name"
                    />
                  </div>
                </div>

                <div
                  className="input-box-wrapper"
                  style={{ display: "flex", width: "100%", gap: "20px" }}
                >
                  <div className="w-50  innerDiv">
                    <p> Contact Person's Position/Role</p>
                    <input
                      type="text"
                      name="name"
                      placeholder="  Contact Person's Position/Role"
                    />
                  </div>

                  <div className="w-50  innerDiv">
                    <p>Enter Your Email</p>
                    <input
                      type="email"
                      name="email"
                      placeholder="Enter email"
                    />
                  </div>
                </div>
                <div
                  className="input-box-wrapper"
                  style={{ display: "flex", width: "100%", gap: "20px" }}
                >
                  <div className="w-50 innerDiv">
                    <p>
                      {" "}
                      Number of Students/Employees Interested in Using Queryflo
                    </p>
                    <input
                      type="number"
                      name="name"
                      placeholder="  type here"
                    />
                  </div>
                  <div className="w-50  innerDiv">
                    <p> Phone Number</p>
                    <input
                      type="text"
                      name="name"
                      placeholder="  Phone Number"
                    />
                  </div>
                </div>

                <div className="w-50  innerDiv">
                  <p>Message Details</p>
                  <textarea placeholder="message details" rows={5} />
                </div>

                <div className="d-flex gap-2 align-items-center ">
                  <input className="w-auto mt-1" type="checkbox" />
                  <p> Agreement to Terms and Conditions</p>
                </div>
              </div>

              <input type="button" value="Submit" className="submit_btn" />
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PartnershipContact;
