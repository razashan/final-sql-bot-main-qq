import { React, useEffect } from "react";
import "./termscondition.scss";
import Navbar from "../../components/shared/navbar";
import Footer from "../../components/shared/footer";

function TermsConditions() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="">
      <Navbar />

      <div className="terms_conditions container">
        <h2 className="main_heading">
          <strong>Terms and Conditions</strong>
        </h2>

        <p className="welcome">Welcome to QueryFlo!</p>

        <p className="rules_regulation">
          These terms and conditions outline the rules and regulations for the
          use of QueryFlo's Website, located at queryflo.com.
        </p>

        <div className="boxes">
          <div className="box">
            <h3 className="headding">1. Use of the Service</h3>
            <p>
              The Service is provided solely for the purpose of creating and
              enhancing professional resumes. You agree not to use the Service
              for any unlawful or prohibited purpose or in any manner that could
              damage, disable, overburden, or impair the Service.
            </p>
          </div>
          <div className="box">
            <h3 className="headding">2. User Accounts</h3>
            <p>
              To access certain features of the Service, you may be required to
              create a user account. You are responsible for maintaining the
              confidentiality of your account and password and for restricting
              access to your account. You agree to accept responsibility for all
              activities that occur under your account or password.
            </p>
          </div>

          <div className="box">
            <h3 className="headding">3. User Content</h3>
            <p>
              You retain ownership of the content you upload to the Service. By
              uploading content, you grant QueryFlo a non-exclusive,
              royalty-free, worldwide, and perpetual license to use, display,
              and reproduce the content.
            </p>
          </div>

          <div className="box">
            <h3 className="headding">4. Modification of Terms</h3>
            <p>
              QueryFlo reserves the right to modify or replace these Terms and
              Conditions at any time. It is your responsibility to check the
              Terms and Conditions periodically for changes. Your continued use
              of the Service after the posting of any changes to the Terms and
              Conditions constitutes acceptance of those changes.
            </p>
          </div>

          <div className="box">
            <h3 className="headding">5. Termination</h3>
            <p>
              QueryFlo may terminate or suspend your access to the Service
              immediately, without prior notice or liability, for any reason
              whatsoever, including without limitation if you breach the Terms
              and Conditions.
            </p>
          </div>

          <div className="box">
            <h3 className="headding">6. Disclaimer</h3>
            <p>
              The Service is provided on an "as-is" and "as-available" basis.
              QueryFlo makes no representations or warranties of any kind,
              express or implied, regarding the Service or the content.
            </p>
          </div>

          <div className="box">
            <h3 className="headding">7. Governing Law</h3>
            <p>
              These Terms and Conditions are governed by and construed in
              accordance with the laws of Country.
            </p>
          </div>

          <div className="box">
            <h3 className="headding">8. Contact Us</h3>
            <p>
              If you have any questions or concerns about these Terms and
              Conditions, please contact us{" "}
              <a href="/contactus">
                <span className="text-dark">here.</span>
              </a>
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default TermsConditions;
