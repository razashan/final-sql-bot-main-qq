import React, { useState, useEffect } from "react";
import tick from "../../assets/icons/tick-vector.webp";
import lineVector from "../../assets/icons/line-vector.svg";
import { getUserProfile } from "../../firebase/firebase";
import { loadStripe } from "@stripe/stripe-js";
import { toast } from "react-toastify";

import axios from "axios";

const Pricing = ({ activePlan, set, userProfile }) => {
  const isProduction = process.env.NODE_ENV === "production";
  const apiUrlCreatePayment = isProduction
    ? process.env.REACT_APP_API_URL_PAYMENT_PROD
    : process.env.REACT_APP_API_URL_PAYMENT;

  const stripeKey = process.env.REACT_APP_STRIPE_PUBLIC_KEY;

  const [paymentMethod, setPaymentMethod] = useState("stripe");

  // useEffect(() => {
  //   console.log("activePlan:", activePlan);
  // }, [activePlan]);

  const [paymentInfo, setPaymentInfo] = useState({
    userId: userProfile?.uid,
    name: "",
    price: 0,
  });

  const createPayment = async (subscriptionType) => {
    const stripe = await loadStripe(stripeKey);
    try {
      // console.log("user Profile:", userProfile);
      const response = await axios.post(apiUrlCreatePayment, {
        userId: userProfile?.uid,
        name: `${subscriptionType} Package`,
        price: getPriceBySubscriptionType(subscriptionType),
      });

      const session = response.data; // create payment
      // console.log("session:", session);

      session.sessionId.message ? toast.error(session.sessionId.message) : null;
      const result = await stripe.redirectToCheckout({
        sessionId: session.sessionId.sessionId,
      });

      if (result.error) {
        // console.log(result.error);
        // Handle error appropriately
      }
    } catch (error) {
      console.error("Error creating checkout session:", error);
      // Handle error appropriately
    }
  };

  const getPriceBySubscriptionType = (subscriptionType) => {
    // Implement logic to determine the price based on subscription type
    switch (subscriptionType) {
      case "Monthly":
        return 19;
      case "Quarterly":
        return 40;
      case "Annual":
        return 99;
      default:
        return 0;
    }
  };

  return (
    <div className="pricing-main-wraper ">
      <div className="pricing-text-section">
        <h1>
          Transparent <br /> <span>Pricing Plans </span>{" "}
        </h1>
        <h4>Explore Our Flexible Plans for SQL QuizBot</h4>
      </div>

      <div className="pricing-cards-section">
        {/* card1 */}
        <div className="card">
          <div
            className={`badge ${activePlan !== "Free Package" ? "d-none" : ""}`}
          >
            Active
          </div>
          <div className="card-top">
            <div className="package-details">
              <div className="package-name">
                <h3>Free</h3>
                <p className="xs">10 SQL Questions</p>
              </div>

              <div className="package-price">
                <h2>
                  <sup>$</sup>0
                </h2>
              </div>

              <div className="package-text">
                <p className="small x-bold">Domains Access </p>
                <p>3 sample (Marketing, Product, Finance)</p>
              </div>

              <img src={lineVector} alt="" className="line-vector" />
            </div>

            <div className="package-includ">
              <div className="package">
                <p>Free SQL Course</p> <img src={tick} alt="tick-img" />
              </div>
              <div className="package">
                <p>Certification Badge</p> <img src={tick} alt="tick-img" />
              </div>
              <div className="package">
                <p>Community Access</p> <img src={tick} alt="tick-img" />
              </div>
            </div>
          </div>
          <div className="card-bottom">
            <button
              className="btn text-color"
              disabled={activePlan !== "Free Package"}
            >
              {" "}
              Free to use
            </button>
          </div>
        </div>

        {/* card2 */}
        <div className="card">
          <div
            className={`badge ${
              activePlan !== "Monthly Package" ? "d-none" : ""
            }`}
          >
            Active
          </div>
          <div className="card-top">
            <div className="package-details">
              <div className="package-name">
                <h3>
                  Pro <span> (monthly)</span>
                </h3>
                <p>Unlimited SQL Questions</p>
              </div>

              <h2>
                <sup className="small">$</sup>
                19
                <sub className="small">/month</sub>
              </h2>

              <div className="package-text">
                <p className="small x-bold">Domains Access </p>
                <p>
                  All (Marketing, Product, Finance, Healthcare, HR, Retail,
                  etc.)
                </p>
              </div>

              <img src={lineVector} alt="" className="line-vector" />
            </div>

            <div className="package-includ">
              <div className="package">
                <p>AI Text-to-SQL</p> <img src={tick} alt="tick-img" />
              </div>

              <div className="package">
                <p>AI Error Help</p> <img src={tick} alt="tick-img" />
              </div>

              <div className="package">
                <p>Free SQL Course</p> <img src={tick} alt="tick-img" />
              </div>

              <div className="package">
                <p>Progress Tracking</p> <img src={tick} alt="tick-img" />
              </div>

              <div className="package">
                <p>Certification Badge</p> <img src={tick} alt="tick-img" />
              </div>

              <div className="package">
                <p>Community Access</p> <img src={tick} alt="tick-img" />
              </div>

              <div className="package">
                <p>50 questions per analytics domain</p>{" "}
                <img src={tick} alt="tick-img" />
              </div>

              <div className="package">
                <p>Free SQL training</p> <img src={tick} alt="tick-img" />
              </div>
            </div>
          </div>

          <div className="card-bottom">
            <div className="bottom-text">
              <p className="font-uniq">Extra Goodies</p>
              <p>“Mentor Feedback Add-on”</p>
            </div>
            <button
              onClick={() => createPayment("Monthly")}
              className="join_btn"
              disabled={activePlan !== "Free Package"}
            >
              Upgrade now
            </button>
          </div>
        </div>

        {/* card 3 - Updated */}
        <div className="card">
          <div
            className={`badge ${
              activePlan !== "Quarterly Package" ? "d-none" : ""
            }`}
          >
            Active
          </div>
          <div className="card-top">
            <div className="package-details">
              <div className="package-name">
                <h3>
                  Pro <span> (3-month)</span>
                </h3>
                <p>Unlimited SQL Questions</p>
              </div>

              <div className="package-price">
                {/* <p className='text-color bold'>Starting from</p> */}
                <h2>
                  <sup className="small">$</sup>
                  40
                  <sub className="small">/(3-month)</sub>
                </h2>
              </div>

              <div className="package-text">
                <p className="small x-bold">Domains Access </p>
                <p>
                  All (Marketing, Product, Finance, Healthcare, HR, Retail,
                  etc.)
                </p>
              </div>

              <img src={lineVector} alt="" className="line-vector" />
            </div>

            <div className="package-includ">
              <div className="package">
                <p>AI Text-to-SQL</p> <img src={tick} alt="tick-img" />
              </div>

              <div className="package">
                <p>AI Error Help</p> <img src={tick} alt="tick-img" />
              </div>

              <div className="package">
                <p>Free SQL Course</p> <img src={tick} alt="tick-img" />
              </div>

              <div className="package">
                <p>Progress Tracking</p> <img src={tick} alt="tick-img" />
              </div>

              <div className="package">
                <p>Certification Badge</p> <img src={tick} alt="tick-img" />
              </div>

              <div className="package">
                <p>Community Access</p> <img src={tick} alt="tick-img" />
              </div>

              <div className="package">
                <p>50 questions per analytics domain</p>{" "}
                <img src={tick} alt="tick-img" />
              </div>

              <div className="package">
                <p>Free SQL training</p> <img src={tick} alt="tick-img" />
              </div>
            </div>
          </div>

          <div className="card-bottom">
            <div className="bottom-text">
              <p className="font-uniq">Extra Goodies</p>
              <p>“Mentor Feedback Add-on”</p>
            </div>
            <button
              onClick={() => createPayment("Quarterly")}
              className="join_btn"
              disabled={activePlan !== "Free Package"}
            >
              Upgrade now
            </button>
          </div>
        </div>

        {/* card4*/}
        <div className="card">
          <div
            className={`badge ${
              activePlan !== "Annual Package" ? "d-none" : ""
            }`}
          >
            Active
          </div>
          <div className="card-top">
            <div className="package-details">
              <div className="package-name">
                <h3>
                  Pro <span> (Annually)</span>
                </h3>
                <p>Unlimited SQL Questions</p>
              </div>

              <h2>
                <sup className="small">$</sup>
                99
                <sub className="small">/annual</sub>
              </h2>

              <div className="package-text">
                <p className="small x-bold">Domains Access </p>
                <p>
                  All (Marketing, Product, Finance, Healthcare, HR, Retail,
                  etc.)
                </p>
              </div>

              <img src={lineVector} alt="" className="line-vector" />
            </div>

            <div className="package-includ">
              <div className="package">
                <p>AI Text-to-SQL</p> <img src={tick} alt="tick-img" />
              </div>

              <div className="package">
                <p>AI Error Help</p> <img src={tick} alt="tick-img" />
              </div>

              <div className="package">
                <p>Free SQL Course</p> <img src={tick} alt="tick-img" />
              </div>

              <div className="package">
                <p>Progress Tracking</p> <img src={tick} alt="tick-img" />
              </div>

              <div className="package">
                <p>Certification Badge</p> <img src={tick} alt="tick-img" />
              </div>

              <div className="package">
                <p>Community Access</p> <img src={tick} alt="tick-img" />
              </div>

              <div className="package">
                <p>50 questions per analytics domain</p>{" "}
                <img src={tick} alt="tick-img" />
              </div>

              <div className="package">
                <p>Free SQL training</p> <img src={tick} alt="tick-img" />
              </div>
            </div>
          </div>

          <div className="card-bottom">
            <div className="bottom-text">
              <p className="font-uniq">Extra Goodies</p>
              <p>“Mentor Feedback Add-on”</p>
            </div>
            <button
              onClick={() => createPayment("Annual")}
              className="join_btn"
              disabled={activePlan !== "Free Package"}
            >
              Upgrade now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
