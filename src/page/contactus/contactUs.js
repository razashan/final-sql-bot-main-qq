import { React, useEffect } from "react";
import "./contactus.scss";
import Navbar from "../../components/shared/navbar";
import Footer from "../../components/shared/footer";

function ContactUs() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="contactus_main">
      <Navbar />

      <div className="contact-us">
        <div className="contact_us_section">
          <div className="contact_us_form">
            <form>
              <h1>Contact us </h1>

              <div className="inputs">
                <p>Enter Your Full Name</p>
                <input type="text" name="name" placeholder="Enter Full Name" />

                <p>Enter Your Email</p>
                <input type="email" name="email" placeholder="Enter email" />

                <p>Message</p>
                <textarea
                  name="message"
                  placeholder="Enter your message"
                  rows="4"
                />
              </div>

              <input type="button" value="Submit" className="submit_btn" />
            </form>
          </div>

          <div className="contact_us_img">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1911822.950001287!2d-121.32697680898298!3d36.40284320259782!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fb9fe5f285e3d%3A0x8b5109a227086f55!2sCalifornia%2C%20USA!5e0!3m2!1sen!2s!4v1704708046001!5m2!1sen!2s"
              width="100%"
              height="100%"
              //   style="border:0;"
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default ContactUs;
