import React, { useEffect, useState } from "react";
import "./admindashboard.scss";
import { Icon } from "@iconify/react";
import {
  Navbar,
  Nav,
  Form,
  FormControl,
  Button,
  Dropdown,
} from "react-bootstrap";
import BugInsight from "../bugInsight/bugInsight";
import Createdatabase from "../createdatabase/createdatabase";
import Adddatabase from "../adddatabase/adddatabase";
import Settings from "../settings/settings";
import {
  getUserProfile,
  getUserDataForCurrentUser,
} from "../../../../firebase/firebase";
import { ToastContainer, toast } from "react-toastify";

import { useNavigate } from "react-router";
import Exercise from "../exercise/exercise";
import AddExercise from "../addexercise/AddExercise";
import Exercises from "../exercises/Exercises";
import logo from "../../../../assets/icons/Updated_Logo-removebg-preview.png";
import { ClipLoader } from "react-spinners";

function Admindashboard({ setActiveTab }) {
  // const { setActiveTab } = props;
  const [activeFilter, setActiveFilter] = useState("Create");
  const [activeInnerFilter, setActiveInnerFilter] = useState("Create");
  const [isLeftDivVisible, setIsLeftDivVisible] = useState(true);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        let res = await getUserDataForCurrentUser();
        if (res) {
          // Use strict equality check
          if (res?.isAdmin === true) {
            // console.log("yes is admjn");
            setLoading(false);

            setIsAdmin(true);
          } else {
            navigate("/");
            setIsAdmin(false);
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData(); // Call the async function inside useEffect
  }, []);

  const navigateToUserDashboard = () => {
    navigate("/user-dashboard");
  };
  const handleFilterBtnClick = () => {
    setIsLeftDivVisible(!isLeftDivVisible);
  };

  const handleFilterClick = (filter) => {
    setActiveFilter(filter);
    setActiveInnerFilter(filter);
    if (window.innerWidth < 1024) {
      setIsLeftDivVisible(!isLeftDivVisible);
    } else {
      setIsLeftDivVisible(isLeftDivVisible);
    }
  };
  const handleResize = () => {
    if (window.innerWidth < 1024) {
      setIsLeftDivVisible(false);
    } else {
      setIsLeftDivVisible(true);
    }
  };

  useEffect(() => {
    handleResize(); // Initial check

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const [userProfile, setUserProfile] = useState(null);

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

  return (
    <>
      {loading ? (
          <div
               className="App"
               style={{
                 display: "flex",
                 justifyContent: "center",
                 alignItems: "center",
                 height: "100vh",
               }}
             >
               <ToastContainer />
               <div className="loading">
                 <ClipLoader />
               </div>
             </div>
      ) : (
        <section className="admin-dashboard">
          <Navbar className="admin-navbar navbar-dark" expand="lg">
            <Navbar.Brand href="/admin-dashboard" className="admin_logo">
              <img src={logo} alt="..." />
            </Navbar.Brand>
            <Navbar.Toggle
              aria-controls="basic-navbar-nav"
              className="topbar-toggle-btn shadow-none"
            />
            <Navbar.Collapse
              className="navbar-collapse profile"
              id="basic-navbar-nav"
            >
              <div className="dropdowns-sec">
                <Dropdown>
                  <Dropdown.Toggle
                    id="dropdown-basic"
                    className="profile-detail"
                  >
                    {userProfile ? (
                      <img src={userProfile?.photoURL} alt="" />
                    ) : (
                      <img src="/images/profile-pic.png" alt="" />
                    )}
                    {userProfile ? (
                      <span>{userProfile?.displayName}</span>
                    ) : (
                      <span>Admin</span>
                    )}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item
                      className="item1"
                      onClick={() =>
                        navigate("/user-dashboard", {
                          state: { activeTab: "User Profile" },
                        })
                      }
                    >
                      Update
                    </Dropdown.Item>
                    <Dropdown.Item
                      className="item2"
                      onClick={() => navigate("/login")}
                    >
                      Log Out
                    </Dropdown.Item>
                    <Dropdown.Item
                      className="item3"
                      onClick={() => {
                        navigate("/user-dashboard");
                        window.location.href = window.location.href;
                      }}
                    >
                      Switch to User
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </Navbar.Collapse>
          </Navbar>

          <div className="content">
            <div className="filter">
              {isLeftDivVisible ? (
                <>
                  {" "}
                  <Icon
                    icon="raphael:cross"
                    width="30"
                    height="30"
                    className="filter-btn"
                    onClick={handleFilterBtnClick}
                  />
                </>
              ) : (
                <>
                  <Icon
                    className="filter-btn"
                    icon="fluent:filter-24-filled"
                    width="30"
                    height="30"
                    onClick={handleFilterBtnClick}
                  />
                </>
              )}
            </div>
            {isLeftDivVisible && (
              <div className="sidebar">
                <div className="top">
                  <div
                    className={`${activeFilter === "Create" ? "active" : ""}`}
                    onClick={() => handleFilterClick("Create")}
                  >
                    <Icon
                      icon="octicon:home-16"
                      width="21.244"
                      height="21.244"
                    />
                    <a href="#">Create Database</a>
                  </div>
                  <div
                    className={`${activeFilter === "Added" ? "active" : ""}`}
                    onClick={() => handleFilterClick("Added")}
                  >
                    <Icon
                      icon="icon-park-outline:add"
                      width="21.244"
                      height="21.244"
                    />
                    <a href="#">Added databases</a>
                  </div>
                  <div
                    className={`${
                      activeFilter === "Addexercise" ? "active" : ""
                    }`}
                    onClick={() => handleFilterClick("Addexercise")}
                  >
                    <Icon
                      icon="material-symbols:add-ad-outline"
                      width="21.244"
                      height="21.244"
                    />
                    <a href="#">Add Question</a>
                  </div>
                  <div
                    className={`${
                      activeFilter === "Exercises" ? "active" : ""
                    }`}
                    onClick={() => handleFilterClick("Exercises")}
                  >
                    <Icon icon="uil:chart" width="21.244" height="21.244" />
                    <a href="#">Analytics</a>
                  </div>

                  <div
                    className={`${
                      activeFilter === "BugInsight" ? "active" : ""
                    }`}
                    onClick={() => handleFilterClick("BugInsight")}
                  >
                    <Icon icon="iconoir:book" width="21.244" height="21.244" />
                    <a href="#">Bug Report</a>
                  </div>
                </div>
                <div className="bottom">
                  <div
                    className="about-profile"
                    onClick={navigateToUserDashboard}
                    style={{ cursor: "pointer" }}
                  >
                    {userProfile ? (
                      <img
                        className="user-pic"
                        src={userProfile?.photoURL}
                        alt=""
                      />
                    ) : (
                      <img src="/images/profile-pic.png" alt="" />
                    )}
                    <div className="user-content">
                      <h6>{userProfile?.displayName}</h6>
                    </div>
                    <img className="users" src="/icons/users.png" alt="..." />
                  </div>
                </div>
              </div>
            )}

            <div className="right-content">
              {activeInnerFilter === "Create" ? (
                <Createdatabase
                  setActiveInnerFilter={setActiveInnerFilter}
                  setActiveFilter={setActiveFilter}
                />
              ) : activeInnerFilter === "Added" ? (
                <Adddatabase
                  setActiveInnerFilter={setActiveInnerFilter}
                  setActiveFilter={setActiveFilter}
                />
              ) : activeInnerFilter === "ex1" ? (
                <Exercise setActiveInnerFilter={setActiveInnerFilter} />
              ) : activeInnerFilter === "Addexercise" ? (
                <AddExercise setActiveInnerFilter={setActiveInnerFilter} />
              ) : activeInnerFilter === "Exercises" ? (
                <Exercises setActiveInnerFilter={setActiveInnerFilter} />
              ) : activeInnerFilter === "BugInsight" ? (
                <BugInsight setActiveInnerFilter={setActiveInnerFilter} />
              ) : null}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export default Admindashboard;
