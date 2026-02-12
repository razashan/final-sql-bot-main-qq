import React, { useState, useEffect } from "react";
import { GRAPHICS } from "../assets";
import { Button, TopBar } from "../components";
import { getUserProfile } from "../../../firebase/firebase";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import { toast } from "react-toastify";
import Pricing from "../../../components/pricing/pricing";

const Subscription = ({
  isSideMenuOpen,
  toggleSideMenu,
  activePlan,
  userProfile,
}) => {
  const isProduction = process.env.NODE_ENV === "production";
  const apiUrlCreatePayment = isProduction
    ? process.env.REACT_APP_API_URL_PAYMENT_PROD
    : process.env.REACT_APP_API_URL_PAYMENT;

  // const stripeKey = process.env.REACT_APP_STRIPE_PUBLIC_KEY;
  // const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const profile = await getUserProfile();
        setUserProfile(profile);
      } catch (error) {
        // Handle errors if necessary
        console.error("Error fetching user profile:", error);
      }
    };

    fetchData();
  }, []);

  // const [paymentInfo, setPaymentInfo] = useState({
  //   userId: userProfile?.uid,
  //   name: "",
  //   price: 0,
  // });

  // const createPayment = async (subscriptionType) => {
  //   const stripe = await loadStripe(stripeKey);
  //   try {
  //     const response = await axios.post(apiUrlCreatePayment, {
  //       userId: userProfile?.uid,
  //       name: `${subscriptionType} Package`,
  //       price: getPriceBySubscriptionType(subscriptionType),
  //     });

  //     const session = response.data;
  //     session.sessionId.message ? toast.error(session.sessionId.message) : null;
  //     const result = await stripe.redirectToCheckout({
  //       sessionId: session.sessionId,
  //     });

  //     if (result.error) {
  //       console.log(result.error);
  //       // Handle error appropriately
  //     }
  //   } catch (error) {
  //     console.error("Error creating checkout session:", error);
  //     // Handle error appropriately
  //   }
  // };

  const getPriceBySubscriptionType = (subscriptionType) => {
    // Implement logic to determine the price based on subscription type
    switch (subscriptionType) {
      case "Monthly":
        return 3;
      case "Quarterly":
        return 6;
      case "Yearly":
        return 9;
      default:
        return 0;
    }
  };

  return (
    <>
      <div>
        <TopBar
          heading={"Subscription"}
          isSideMenuOpen={isSideMenuOpen}
          toggleSideMenu={toggleSideMenu}
        />
      </div>

      <div className="pricing-com-user-dashboard">
        <Pricing activePlan={activePlan} userProfile={userProfile} />
      </div>

      {/* 
     <div className="card_section ">
        <div className="heading">
          <h1>
            Money well <span>invested</span>{" "}
          </h1>

          <p>1,436 Premiums bought in the last 24 hours.</p>
        </div>

        <div className="cards">
          <div className="subscription_card">
            <div className="top_card">
              <div className="card_heading">
                <h1>Monthly</h1>

                <p>Pay $36 every 12 months</p>
              </div>

              <div className="price_and_buttons">
                <div className="price">
                  <h1>
                    <sup>$</sup>3<span>/ month</span>
                  </h1>
                </div>

                <div className="buttons">
                 
                  <Button
                    text="Upgrade Now"
                    onClick={() => createPayment("Monthly")}
                    active={true}
                  />

                  <p>14-day money back guarantee</p>
                </div>
              </div>
            </div>

            <hr className="hr" />

            <div className="card_content">
              <div className="tick_line">
                <img src={GRAPHICS.Card_Tick_Icon} alt="" />

                <span>Everything from Monthly.</span>
              </div>

              <div className="card_description">
                <h1>Extra Goodies</h1>

                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </div>
            </div>
          </div>

          <div
            className="subscription_card "
            style={{ marginTop: -40, marginBottom: 40 }}
          >
            <div className="top_card">
              <div className="card_heading">
                <h1>Quarterly</h1>

                <p>Pay $18 every 3 months</p>
              </div>

              <div className="price_and_buttons">
                <div className="price">
                  <h1>
                    <sup>$</sup>6<span>/ month</span>
                  </h1>
                </div>

                <div className="buttons">
                  <Button
                    text="Upgrade Now"
                    onClick={() => createPayment("Quarterly")}
                    active={true}
                  />
                

                  <p>14-day money back guarantee</p>
                </div>
              </div>
            </div>

            <hr className="hr" />

            <div className="card_content">
              <div className="tick_line">
                <img src={GRAPHICS.Card_Tick_Icon} alt="" />

                <span>Everything from Monthly.</span>
              </div>

              <div className="card_description">
                <h1>Extra Goodies</h1>

                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </div>
            </div>
          </div>

          <div className="subscription_card">
            <div className="top_card">
              <div className="card_heading">
                <h1>Yearly </h1>

                <p>Pay every months</p>
              </div>

              <div className="price_and_buttons">
                <div className="price">
                  <h1>
                    <sup>$</sup>9<span>/ month</span>
                  </h1>
                </div>

                <div className="buttons">
                  <Button
                    text="Upgrade Now"
                    onClick={() => createPayment("Yearly")}
                    active={true}
                  />
                

                  <p>14-day money back guarantee</p>
                </div>
              </div>
            </div>

            <hr className="hr" />

            <div className="card_content">
              <div className="tick_line">
                <img src={GRAPHICS.Card_Tick_Icon} alt="" />

                <span>Lorem ipsum dolor sit .</span>
              </div>

              <div className="tick_line">
                <img src={GRAPHICS.Card_Tick_Icon} alt="" />

                <span>Lorem ipsum dolor sit .</span>
              </div>

              <div className="tick_line">
                <img src={GRAPHICS.Card_Tick_Icon} alt="" />

                <span>Lorem ipsum dolor sit .</span>
              </div>

              <div className="tick_line">
                <img src={GRAPHICS.Card_Tick_Icon} alt="" />

                <span>Lorem ipsum dolor sit .</span>
              </div>

              <div className="tick_line">
                <img src={GRAPHICS.Card_Tick_Icon} alt="" />

                <span>Lorem ipsum dolor sit .</span>
              </div>

              <div className="tick_line">
                <img src={GRAPHICS.Card_Tick_Icon} alt="" />

                <span>Lorem ipsum dolor sit .</span>
              </div>
            </div>
          </div>
        </div>

        <div className="question">
          Are you a <span>student</span> or a <span>teacher</span> ?{" "}
          <p>Try Query Flo Premium for free today.</p>
        </div>
      </div>  */}
    </>
  );
};

export default Subscription;
