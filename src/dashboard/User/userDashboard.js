import React, { useState, useEffect, useContext } from "react";
import {
  AIText,
  History,
  Database,
  ContactUs,
  Dashboard,
  UserLevel,
  LeaderBoard,
  UserProfile,
  Subscription,
  DiscussionForum,
  ReportBugs,
} from "./content";
import { GRAPHICS } from "./assets";
import { SIDEBAR_BTN } from "./mock";
import { Icon } from "@iconify/react";
import { useAccounts } from "./hooks/accounts";
import { MyContext } from "../../context/context";
import GuidePage from "../../page/guide/guidePage";
import axios from "axios";
import { getUserProfile } from "../../firebase/firebase";
const UserDashboard = ({
  isAdmin,
  setActiveTab,
  activeTab,
  databasee,
  setDatabasee,
}) => {
  // const [activeTab, setActiveTab] = useState("SQL Dashboard");
  // console.log(activeTab);
  const [activePlan, setActivePlan] = useState("Free Package");
  const [userProfile, setUserProfile] = useState(null);

  const isProduction = process.env.NODE_ENV === "production";
  const baseUrl = isProduction
    ? process.env.REACT_APP_BASE_URL_PRODUCTION
    : process.env.REACT_APP_BASE_URL_LOCAL;
  console.log("baseUrl:", baseUrl);

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

  useEffect(() => {
    // console.log("userProfile:", userProfile);
    const fetchPlan = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}/payments/${userProfile?.uid}`,
          {
            // params: { userId: userProfile?.uid },
          }
        );
        if (response.data) {
          // console.log("response:", response);
          setActivePlan(response.data.data.subscriptionName);
          // activePlan(response.data);
        }
      } catch (error) {
        console.error("Error fetching plan:", error);
      }
    };

    if (userProfile && baseUrl) {
      fetchPlan();
    }
  }, [userProfile]);
  const { value, setValue } = useContext(MyContext);

  useEffect(() => {
    console.log("activeTab:", activeTab);
  }, [activeTab]);

  const { tab } = useAccounts();

  useEffect(() => {
    if (tab == "Subscription") {
      setActiveTab(tab);
    }
  }, [tab]);

  const [isSideMenuOpen, setSideMenuOpen] = useState(false);

  // Function to toggle the side menu
  const toggleSideMenu = () => {
    setSideMenuOpen(!isSideMenuOpen);
  };

  // console.log("SIDEBAR_BTN:", SIDEBAR_BTN);

  return (
    <>
      <div className="User_Dashboard">
        <div
          className={`Sidebar ${isSideMenuOpen ? "Sidebar_show" : "Sidebar"}`}
        >
          <div className="logo">
            <img src={GRAPHICS.Logo} alt="" />

            <div className="cross">
              <Icon
                icon="basil:cross-solid"
                color="white"
                width="40"
                height="40"
                onClick={() => {
                  setSideMenuOpen(false);
                }}
              />
            </div>
          </div>

          <div className="buttons">
            {SIDEBAR_BTN.map((item) => {
              // console.log("item.button:", item.button);

              return (
                <>
                  <div
                    className={`${
                      activeTab === item.button
                        ? "active_container"
                        : "container"
                    }`}
                    onClick={() => {
                      setActiveTab(item.button);
                    }}
                    key={item.id}
                  >
                    <img
                      src={
                        activeTab === item.button ? item.activeImg : item.img
                      }
                      alt=""
                    />

                    <button
                      className={`${
                        activeTab === item.button ? "active_btn" : "btn"
                      } `}
                      onClick={toggleSideMenu}
                    >
                      {item.button}
                    </button>
                  </div>
                </>
              );
            })}
          </div>

          <div className="progress_bar">
            {/* <img src={GRAPHICS.Upgrade} alt="" className="upgrade" /> */}
            {/* <div className="upgrate_now">
              <div>
                <div className="upgrade_img">
                  <img src={GRAPHICS.Upgrade_Now} alt="upgrade now" />
                </div>
                <h1>Want to upgrade</h1>
              </div>

              <button>Upgrade now</button>
            </div> */}

            {/* <img src={GRAPHICS.Progress_Bar} alt="" /> */}
            {/* <div className="your_progress">
              <h1>Your progress</h1>
              <h2>75% Questions Solved: 90 of 103</h2>
              
              <input type="range" />
            </div> */}
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="Content">
          {activeTab === "SQL Dashboard" ? (
            <>
              <div className="Dashboard_Content">
                <Dashboard
                  isSideMenuOpen={isSideMenuOpen}
                  toggleSideMenu={toggleSideMenu}
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                  isAdmin={isAdmin}
                  databasee={databasee}
                  setDatabasee={setDatabasee}
                  activePlan={activePlan}
                />
              </div>
            </>
          ) : activeTab === "AI text to SQL" ? (
            <>
              <div className="AI_Content">
                <AIText
                  isAdmin={isAdmin}
                  isSideMenuOpen={isSideMenuOpen}
                  toggleSideMenu={toggleSideMenu}
                />
              </div>
            </>
          ) : activeTab === "Select Database" ? (
            <>
              <div className="Database_Content">
                <Database
                  isSideMenuOpen={isSideMenuOpen}
                  toggleSideMenu={toggleSideMenu}
                  setActiveTab={setActiveTab}
                  activeTab={activeTab}
                  databasee={databasee}
                  setDatabasee={setDatabasee}
                />
              </div>
            </>
          ) : activeTab === "Bookmarks" ? (
            <>
              <div className="History_Content">
                <History
                  isSideMenuOpen={isSideMenuOpen}
                  toggleSideMenu={toggleSideMenu}
                />
              </div>
            </>
          ) : activeTab === "Leader Board" ? (
            <>
              <div className="LeaderBoard_Content">
                <LeaderBoard
                  isSideMenuOpen={isSideMenuOpen}
                  toggleSideMenu={toggleSideMenu}
                />
              </div>
            </>
          ) : activeTab === "Subscription" ? (
            <>
              <div className="Subscription_Content">
                <Subscription
                  isSideMenuOpen={isSideMenuOpen}
                  toggleSideMenu={toggleSideMenu}
                  activePlan={activePlan}
                  userProfile={userProfile}
                />
              </div>
            </>
          ) : activeTab === "Discussion Forum" ? (
            <>
              <div className="DiscussionForm_Content">
                <DiscussionForum
                  isSideMenuOpen={isSideMenuOpen}
                  toggleSideMenu={toggleSideMenu}
                />
              </div>
            </>
          ) : activeTab === "User Level" ? (
            <>
              <div className="UserLevel_Content">
                <UserLevel
                  isSideMenuOpen={isSideMenuOpen}
                  toggleSideMenu={toggleSideMenu}
                />
              </div>
            </>
          ) : activeTab === "User Profile" ? (
            <>
              <div className="UserProfile_Content">
                <UserProfile
                  isSideMenuOpen={isSideMenuOpen}
                  toggleSideMenu={toggleSideMenu}
                />
              </div>
            </>
          ) : activeTab === "Contact Us" ? (
            <>
              <div className="ContactUs_Content">
                <ContactUs
                  isSideMenuOpen={isSideMenuOpen}
                  toggleSideMenu={toggleSideMenu}
                />
              </div>
            </>
          ) : activeTab === "Report Bugs" ? (
            <>
              <div className="Report_Bugs">
                <ReportBugs
                  isSideMenuOpen={isSideMenuOpen}
                  toggleSideMenu={toggleSideMenu}
                />
              </div>
            </>
          ) : activeTab === "Guide" ? (
            <>
              <div className="Report_Bugs">
                <GuidePage />
              </div>
            </>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
};

export default UserDashboard;
