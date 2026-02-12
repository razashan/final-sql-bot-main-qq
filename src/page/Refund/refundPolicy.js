import { React, useEffect } from "react";
import Navbar from "../../components/shared/navbar";
import Footer from "../../components/shared/footer";
import "./refundPollicy.scss";

function RefundPolicy() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="">
      <Navbar />

      <div className="refund_policy container">
        <h2 className="main_heading">
          <strong>Refund Policy</strong>
        </h2>

        <p className="welcome">Introduction</p>

        <p className="rules_regulation">
          This Refund Policy applies to the services provided by QueryFlo (the
          "Service"). Please read this policy carefully before using the
          Service.
        </p>

        <div className="boxes">
          <div className="box">
            <h3 className="headding">1. Refund Eligibility</h3>
            <p>
              We offer a refund for the purchase of premium services within a
              specified period after the purchase. To be eligible for a refund,
              you must request it within 3 days from the date of purchase* .
            </p>
          </div>
          <div className="box">
            <h3 className="headding">2. How to Request a Refund</h3>
            <p>
              To request a refund, please contact our support team here with
              your order details and the reason for the refund request. We will
              review your request and respond as soon as possible.
            </p>
          </div>

          <div className="box">
            <h3 className="headding">3. Refund Process</h3>
            <p>
              Once your refund request is approved, we will process the refund
              to the original method of payment within 7 days. Please note that
              it may take additional time for the refund to appear in your
              account, depending on your financial institution.
            </p>
          </div>

          <div className="box">
            <h3 className="headding">4. Non-Refundable Items</h3>
            <p>
              <p>
                {" "}
                Certain items are non-refundable, including but not limited to:
              </p>
              <p> Downloadable products</p>
              <p> Services that have already been provided</p>
            </p>
          </div>

          <div className="box">
            <h3 className="headding">5. Changes to This Policy</h3>
            <p>
              QueryFlo reserves the right to modify or replace this Refund
              Policy at any time. It is your responsibility to check the Refund
              Policy periodically for changes. Your continued use of the Service
              after the posting of any changes to the Refund Policy constitutes
              acceptance of those changes.
            </p>
          </div>

          <div className="box">
            <h3 className="headding">6. Contact Us</h3>
            <p>
              If you have any questions or concerns about this Refund Policy,
              please contact us{" "}
              <a href="/contactus">
                <span className="text-dark">here.</span>
              </a>{" "}
              <p>Thank you for using QueryFlo.</p>
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default RefundPolicy;
