import { useLocation, Route, Routes, Navigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Home from "./page/home";
import Navbar from "./components/shared/navbar";
import Footer from "./components/shared/footer";
import Signup from "./components/account/signup";
import Login from "./components/account/login";
import Forget from "./components/account/forget";
import TermsConditions from "./page/terms&condition/termsConditions";
import UserDashboard from "./dashboard/User/userDashboard";
import Dashboard from "./dashboard/newUser/newuserdashboard/dashboard";
import Admindashboard from "./dashboard/admin/admin/admindashboard/admindashboard";
import SuccessPayment from "./dashboard/User/content/successPayment";
import FailPayment from "./dashboard/User/content/failPayment";

import { useEffect, useState } from "react";
// import TermsConditions from "./page/terms&condition/termsConditions";
import PrivacyPolicy from "./page/privacypolicy/privacyPolicy";
import RefundPolicy from "./page/Refund/refundPolicy";
import ContactUs from "./page/contactus/contactUs";
import { ClipLoader } from "react-spinners";
import { checkAuthState } from "./firebase/firebase";
import axios from "axios";
import { getUserDataForCurrentUser } from "../src/firebase/firebase";
import Partnership from "./page/partnership/partnersipContact";
import DataPrivacy from "./page/dataPrivacy/dataPrivacy";
import About from "./page/about/about";
import PartnershipContact from "./page/partnership/partnersipContact";
import PartnershipPage from "./page/partnership/partnershipPage";
import Pricing from "./components/pricing/pricingPage";
import PricingPage from "./components/pricing/pricingPage";
import { AccountsProvider } from "./dashboard/User/hooks/accounts";
import { MyProvider } from "./context/context";
import GuidePage from "./page/guide/guidePage";
import IntroSQL from "./components/guide/introSQL";
import DataTypeSQL from "./components/guide/dataTypeSQL";
import TerminologieSQL from "./components/guide/terminologieSQL";
function App() {
  let { pathname } = window.location;

  pathname = pathname.split("/")[1];

  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const adminEmail = process.env.REACT_APP_ADMIN_EMAIL;
  const password = process.env.REACT_APP_ADMIN_PASSWORD;
  const [isAdmin, setIsAdmin] = useState(true);

  const [activeTab, setActiveTab] = useState("SQL Dashboard");
  const [databasee, setDatabasee] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        let res = await getUserDataForCurrentUser();
        // console.log("res", res);
        if (res) {
          // Use strict equality check
          if (res?.isAdmin === true) {
            setIsAdmin(true);
          } else {
            setIsAdmin(false);
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData(); // Call the async function inside useEffect
  }, []);

  useEffect(() => {
    const fetchAuthState = async () => {
      try {
        const loginSuccess = await checkAuthState();

        if (loginSuccess) {
          // console.log("logged in ");
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
          // console.log("logged out");
        }
      } catch (error) {
        console.error("Error checking authentication state:", error);
      }
    };

    fetchAuthState();
  }, [location]);

  const handleLogin = (loggedInAsAdmin) => {
    // Do something with the loggedInAsAdmin value
  };

  return (
    <div className="App">
      <ToastContainer />
      {/* {pathname !== "userDashboard" && <Navbar />} */}

      <MyProvider>
        <AccountsProvider>
          <Routes>
            {/* About Page */}
            <Route path="/about" element={<About />} />

            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/forget" element={<Forget />} />
            <Route path="/terms" element={<TermsConditions />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/refund" element={<RefundPolicy />} />
            <Route path="/contactus" element={<ContactUs />} />

            {/* PartnerShip page */}
            <Route path="/partnership" element={<PartnershipPage />} />

            {/* Partnership-Contact */}
            <Route
              path="/partnership-contact"
              element={<PartnershipContact />}
            />

            {/* Pricing-page*/}
            <Route path="/pricing-page" element={<PricingPage />} />

            {/* --------- Guide ------ */}
            <Route path="/guide-page" element={<GuidePage />} />

            <Route path="/guide-page/sql-intro" element={<IntroSQL />} />
            <Route
              path="/guide-page/sql-terminologies"
              element={<TerminologieSQL />}
            />
            <Route path="/guide-page/sql-data-type" element={<DataTypeSQL />} />
            <Route path="/sql-erd" element={<GuidePage />} />
            <Route path="/sql-category" element={<GuidePage />} />
            <Route path="/sql-basic-command" element={<GuidePage />} />
            <Route path="/sql-intermdiate-command" element={<GuidePage />} />
            <Route path="/sql-acid-transaction" element={<GuidePage />} />
            <Route path="/sql-advance-command" element={<GuidePage />} />
            <Route path="/sql-window-function" element={<GuidePage />} />

            {/* dummy pr */}

            <Route path="/data-privacy" element={<DataPrivacy />} />

            <Route path="/old-user-dashboard" element={<UserDashboard />} />
            <Route path="/SuccessPayment" element={<SuccessPayment />} />
            <Route path="/FailPayment" element={<FailPayment />} />

            <Route
              path="/user-dashboard"
              element={
                <UserDashboard
                  isAdmin={isAdmin}
                  setActiveTab={setActiveTab}
                  activeTab={activeTab}
                  databasee={databasee}
                  setDatabasee={setDatabasee}
                />
              }
            />

            <Route path="/admin-dashboard" element={<Admindashboard />} />
          </Routes>
        </AccountsProvider>
      </MyProvider>
    </div>
  );
}

export default App;
