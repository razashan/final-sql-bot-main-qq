import { React, useEffect } from "react";
import "./privacyPolicy.scss";
import Navbar from "../../components/shared/navbar";
import Footer from "../../components/shared/footer";

function PrivacyPolicy() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <Navbar />
      <div className="privacy_policy container">
        <h2 className="main_heading">
          <strong> Privacy Policy</strong>
        </h2>

        <p className="welcome">Introduction</p>

        <p className="rules_regulation">
          Welcome to QueryFlo, a platform designed to empower users in creating
          and enhancing their professional resumes. At QueryFlo, we understand
          the importance of your personal information, and we are committed to
          safeguarding your privacy. This Data Privacy Policy outlines how we
          collect, use, and protect your data
        </p>

        <div className="boxes">
          <div className="box">
            <h3 className="headding">Information We Collect</h3>
            <p>
              <h4>User-Provided Information</h4>
              <p>
                <span>Account Information:</span>When you sign up for an
                account, we collect your name, email address, and password to
                secure your account.
              </p>
              <h4>Automatically Collected Information</h4>
              <p>
                {" "}
                <span>Usage Data:</span>We collect information about how users
                interact with our platform, including pages visited, features
                used, and any errors encountered. This data helps us improve our
                services.
              </p>

              <h4>Cookies and Similar Technologies</h4>
              <p>
                <span>Cookies:</span>We use cookies to enhance user experience
                and collect information about preferences. You can manage cookie
                preferences in your browser settings.
              </p>
            </p>
          </div>
          <div className="box">
            <h3 className="headding">How We Use Your Information</h3>
            <p>
              <span>Improving Services:</span> We analyze usage data to enhance
              our platform, identify trends, and fix issues.{" "}
              <p>
                <span>Communication:</span> We may use your email address to
                send important notifications related to your account, updates,
                and promotional content. You can opt-out of promotional emails.
              </p>
            </p>
          </div>

          <div className="box">
            <h3 className="headding">Data Security</h3>
            <p>
              We prioritize the security of your information:
              <p>
                {" "}
                <span>Encryption:</span> All data transmission is encrypted
                using industry-standard protocols.
              </p>
              <p>
                {" "}
                <span> Access Controls:</span> Limited access to personal data
                is granted only to authorized personnel.
              </p>{" "}
              <p>
                {" "}
                <span>Regular Audits:</span> We conduct regular security audits
                to identify and address vulnerabilities.
              </p>
            </p>
          </div>

          <div className="box">
            <h3 className="headding">Third-Party Services</h3>
            <p>
              We may use third-party services for analytics, authentication, and
              other purposes. These services have their own privacy policies,
              and we encourage you to review them.
            </p>
          </div>

          <div className="box">
            <h3 className="headding">Data Retention</h3>
            <p>
              We retain your data for as long as necessary for the purposes
              outlined in this policy or as required by law.
            </p>
          </div>

          <div className="box">
            <h3 className="headding">Your Choices</h3>
            <p>
              Editing and Deleting Data: You can edit or delete your account and
              associated data at any time. Cookies: You can manage cookie
              preferences in your browser.
            </p>
          </div>

          <div className="box">
            <h3 className="headding">Updates to this Policy</h3>
            <p>
              We may update this Data Privacy Policy to reflect changes in our
              practices. We will notify you of significant changes through email
              or prominent notices on our website.
            </p>
          </div>

          <div className="box">
            <h3 className="headding">Contact Us</h3>
            <p>
              If you have any questions or concerns about this Data Privacy
              Policy, please contact us{" "}
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

export default PrivacyPolicy;
