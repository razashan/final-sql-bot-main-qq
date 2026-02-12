import { React, useEffect } from "react";
import Navbar from "../../components/shared/navbar";
import Footer from "../../components/shared/footer";
import "./dataPrivacy.scss";

const DataPrivacy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="data-privacy-page">
      <Navbar />
      <div className="data-content">
        <div className="data-privacy-content">
          <h1>Data Privacy Policy</h1>
          <p>
            At <strong>Queryflo</strong>, we are committed to protecting and
            respecting your privacy. This Data Privacy Policy explains how we
            collect, use, and safeguard your personal information when you visit
            our website, use our services, or interact with us in other ways.
            Please read this policy carefully to understand our views and
            practices regarding your personal data and how we will treat it.
          </p>

          <h2>1. Information We Collect</h2>
          <p>
            We may collect the following types of information when you use our
            services:
          </p>
          <ul>
            <li>
              <strong>Personal Identification Information:</strong> This
              includes your name, email address, phone number,
              organization/institution name, job title, and any other
              information you provide through our contact forms or accounts.
            </li>
            <li>
              <strong>Usage Data:</strong> This includes information about how
              you use our website and services, such as IP addresses, browser
              type, access times, pages viewed, and actions taken.
            </li>
            <li>
              <strong>Payment Information:</strong> If you purchase any premium
              services, we collect payment information such as billing address
              and payment method (e.g., credit card details). We use secure
              payment processors to handle these transactions.
            </li>
          </ul>

          <h2>2. How We Use Your Information</h2>
          <p>We use the information we collect in the following ways:</p>
          <ul>
            <li>
              <strong>To Provide Services:</strong> We use your information to
              provide you with access to our platform, process your requests,
              and respond to inquiries.
            </li>
            <li>
              <strong>To Improve Our Services:</strong> Your feedback and usage
              data help us improve the functionality and performance of our
              services.
            </li>
            <li>
              <strong>For Customer Support:</strong> We may use your information
              to assist you with any issues or questions you have about our
              services.
            </li>
            <li>
              <strong>To Communicate with You:</strong> We may send you
              important updates, newsletters, and marketing communications about
              our services, partnerships, and special offers. You can opt-out of
              marketing communications at any time.
            </li>
            <li>
              <strong>To Comply with Legal Obligations:</strong> We may use your
              information to comply with applicable laws, regulations, or legal
              requests.
            </li>
          </ul>

          <h2>3. How We Protect Your Information</h2>
          <p>
            We take the security of your personal data seriously. We use a
            variety of technical and organizational measures to protect your
            information from unauthorized access, alteration, disclosure, or
            destruction. These measures include:
          </p>
          <ul>
            <li>
              <strong>Encryption:</strong> We use industry-standard encryption
              protocols to protect sensitive information such as payment details
              during transmission.
            </li>
            <li>
              <strong>Access Control:</strong> We restrict access to your
              personal information to authorized personnel only who require it
              for processing or support purposes.
            </li>
            <li>
              <strong>Secure Servers:</strong> Our website and data are hosted
              on secure servers to minimize the risk of unauthorized access.
            </li>
          </ul>

          <h2>4. Sharing Your Information</h2>
          <p>
            We will not share your personal information with third parties
            except in the following situations:
          </p>
          <ul>
            <li>
              <strong>Service Providers:</strong> We may share your information
              with third-party vendors, contractors, or service providers who
              assist in operating our business, such as payment processors,
              hosting services, and customer support tools. These service
              providers are contractually obligated to handle your information
              with confidentiality and security.
            </li>
            <li>
              <strong>Legal Requirements:</strong> We may disclose your
              information if required by law, in response to a court order, or
              when we believe it is necessary to comply with legal obligations
              or protect our rights.
            </li>
            <li>
              <strong>Business Transfers:</strong> If we undergo a merger,
              acquisition, or sale of all or part of our business, your
              information may be transferred as part of that transaction.
            </li>
          </ul>

          <h2>5. Your Rights and Choices</h2>
          <p>
            You have certain rights regarding your personal data, including:
          </p>
          <ul>
            <li>
              <strong>Access:</strong> You can request access to the personal
              data we hold about you.
            </li>
            <li>
              <strong>Correction:</strong> You can request corrections to
              inaccurate or incomplete personal data.
            </li>
            <li>
              <strong>Deletion:</strong> You may request that we delete your
              personal data, subject to any legal obligations we have to retain
              certain information.
            </li>
            <li>
              <strong>Opt-Out:</strong> You can opt out of marketing
              communications at any time by following the unsubscribe
              instructions in our emails.
            </li>
            <li>
              <strong>Data Portability:</strong> You may request a copy of your
              personal data in a machine-readable format.
            </li>
          </ul>

          <h2>6. Data Retention</h2>
          <p>
            We retain your personal information for as long as necessary to
            provide our services, comply with legal obligations, resolve
            disputes, and enforce our agreements. Once your data is no longer
            needed, we will securely delete or anonymize it.
          </p>

          <h2>7. Cookies and Tracking Technologies</h2>
          <p>
            We use cookies and other tracking technologies (such as web beacons)
            to improve your experience on our website, analyze usage patterns,
            and deliver personalized content and advertisements. You can manage
            cookie preferences through your browser settings. For more
            information on how we use cookies, please refer to our Cookie
            Policy.
          </p>

          <h2>8. International Data Transfers</h2>
          <p>
            If you are accessing our services from outside the country in which
            our servers are located, your data may be transferred to and
            processed in a different jurisdiction. We take appropriate measures
            to ensure that your data is protected in accordance with applicable
            data protection laws.
          </p>

          <h2>9. Third-Party Links</h2>
          <p>
            Our website may contain links to third-party websites or services.
            We are not responsible for the privacy practices of these external
            sites, and we encourage you to review their privacy policies before
            providing any personal data.
          </p>

          <h2>10. Updates to This Privacy Policy</h2>
          <p>
            We may update this Data Privacy Policy from time to time. Any
            changes will be posted on this page, and we will revise the "last
            updated" date at the bottom of the page. We encourage you to review
            this policy periodically to stay informed about how we protect your
            data.
          </p>

          <h2>11. Contact Us</h2>
          <p>
            If you have any questions or concerns about this Data Privacy
            Policy, or if you would like to exercise your rights related to your
            personal data, please contact us at:
          </p>
          <ul>
            <li>
              <strong>Email:</strong> [your-email@example.com]
            </li>
            <li>
              <strong>Phone:</strong> [your-phone-number]
            </li>
            <li>
              <strong>Address:</strong> [your-physical-address]
            </li>
          </ul>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DataPrivacy;
