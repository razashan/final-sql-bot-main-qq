import { GRAPHICS } from "../assets";
import { Button } from "../components";
import React, { useRef, useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import useOutsideClick from "../hooks/useClickOutside";
import { signOutUser } from "../../../firebase/firebase";
import { Dropdown } from "react-bootstrap";

import { useNavigate } from "react-router-dom";
import { getUserProfile, getUserDataForCurrentUser } from "../../../firebase/firebase";
import axios from "axios";

const TopBar = ({
  heading,
  backArrow,
  onClick,
  search,
  isSideMenuOpen,
  toggleSideMenu,
}) => {
  const [profile, setProfile] = useState(false);
  const [isNotification, setIsNotification] = useState(true);
  const [showNotifications, setShowNotificatios] = useState(false);
  const [searchShow, setSearchShow] = useState(false);
  const [open, setOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let res = await getUserDataForCurrentUser();
        if (res) {
          // Use strict equality check
          if (res?.isAdmin === true) {
            setIsAdmin(true);
          } else {
            setIsAdmin(false);
          }
        }

      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchData();  // Call the async function inside useEffect
  }, []);

  const navigate = useNavigate();

  const toggleSearchBar = () => {
    setSearchShow(!searchShow);
  };

  const handleNotifications = () => {
    // setIsNotification(!isNotification);
    if (isNotification) setShowNotificatios(!showNotifications);
  };

  const profileRef = useRef();

  const notificationRef = useRef();

  const searchRef = useRef();
  const searchIconRef = useRef();

  useOutsideClick(profileRef, () => {
    setProfile(false);
  });

  useOutsideClick(searchRef, () => {
    setSearchShow(false);
  });

  useOutsideClick(searchIconRef, () => {
    setSearchShow(false);
  });

  useOutsideClick(notificationRef, () => {
    setShowNotificatios(false);
  });

  const [showDropdown, setShowDropdown] = useState(false);

  const handleDropdownToggle = () => {
    setShowDropdown(!showDropdown);
  };

  const handleDropdownClose = () => {
    setShowDropdown(false);
  };

  const SignOut = () => {
    signOutUser();
    navigate("/");
  };

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

  const [notification, setNotifications] = useState([]);

  const isProduction = process.env.NODE_ENV === "production";
  const apiUrlGetNotifications = isProduction
    ? process.env.REACT_APP_API_URL_GET_NOTIFICATIONS_PROD
    : process.env.REACT_APP_API_URL_GET_NOTIFICATIONS;


  useEffect(() => {
    if (userProfile) {
      const url = `${apiUrlGetNotifications}?userId=${userProfile?.uid}`;

      axios
        .get(url)
        .then((res) => {
          setNotifications(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [userProfile?.uid]);

  return (
    <>
      <div className="topbar ">
        <div className="top">
          <div className="search_section">
            {isSideMenuOpen ? (
              <>
                <Icon
                  icon="raphael:cross"
                  width="50"
                  height="38"
                  className="side_menu_icon  "
                  onClick={toggleSideMenu}
                />
              </>
            ) : (
              <>
                <Icon
                  icon="majesticons:menu"
                  width="50"
                  height="38"
                  className="side_menu_icon  "
                  onClick={toggleSideMenu}
                />
              </>
            )}

            {/* <div className="d-flex align-items-center gap-2 back_btn">
            <Icon
              icon="humbleicons:arrow-go-back"
              width="56"
              height="56"
              className={backArrow ? "d-flex" : "d-none"}
              onClick={onClick}
            />
          </div> */}
            <h1>{heading}</h1>

            <div className={`search_bar ${search ? "" : "hidebar"}`}>
              <input type="text" placeholder="Search" />

              <img src={GRAPHICS.Search_Icon} alt="" />
            </div>
          </div>

          <div className="profile_section">
            <div
              className="search_icon"
              onClick={toggleSearchBar}
              ref={searchIconRef}
            >
              <Icon icon="il:search" width="22" height="22" />
            </div>

            {/* <div className="notification_section" ref={notificationRef}>
              <img
                src={
                  isNotification
                    ? GRAPHICS.Notification_Active
                    : GRAPHICS.Notification
                }
                alt=""
                onClick={handleNotifications}
              />

              {isNotification && showNotifications && (
                <div className="notifications">
                  <p>this is the notification</p>
                  <p>this is the notification</p>
                  <p>this is the notification</p>
                  <p>this is the notification</p>
                </div>
              )}
            </div> */}

            <Dropdown
              show={showDropdown}
              onToggle={handleDropdownToggle}
              onClose={handleDropdownClose}
            >
              <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                <Icon icon="iconoir:bell-notification" />
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {notification?.map((notification, index) => (
                  <Dropdown.Item key={index}>{notification.body}</Dropdown.Item>
                ))}
                {/* <Dropdown.Item >test</Dropdown.Item> */}
              </Dropdown.Menu>
            </Dropdown>


            <div
              className="profile"
              onClick={() => setProfile(!profile)}
              ref={profileRef}
            >
              <>
                <img
                  src={
                    userProfile && userProfile.photoURL
                      ? userProfile.photoURL
                      : GRAPHICS.Profile
                  }
                  alt=""
                  className="profile_img"
                />
                <span>
                  {userProfile && userProfile.displayName
                    ? userProfile.displayName
                    : "Danielle Campbell"}
                </span>
              </>

              <img
                src={
                  profile ? GRAPHICS.Arrow_Up_Mini : GRAPHICS.Arrow_Down_Mini
                }
                alt=""
                className="icon"
              />

              {profile && (
                <>
                  <div
                    className="profile_modal"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <p>
                      {" "}
                      {userProfile && userProfile.displayName
                        ? userProfile.displayName
                        : "Danielle Campbell"}
                    </p>

                    <div>
                      <button onClick={SignOut} active className="logout_btn">
                        Logout
                      </button>
                      {/* <Button logout text={"Logout"} onClick={SignOut} active /> */}
                    </div>
                    <div>{

                      isAdmin &&
                      <Button
                        text={"Switch to admin"}
                        onClick={() => {
                          navigate("/admin-dashboard");
                        }}
                      />
                    }

                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        <div
          className={`bottom ${searchShow ? "showtopbar" : "hidetopbar"}`}
          onClick={(e) => e.stopPropagation()}
        >
          {" "}
          <div className="search_bar">
            <input type="text" placeholder="Search" />

            <img src={GRAPHICS.Search_Icon} alt="" />
          </div>
        </div>
      </div>
    </>
  );
};

export default TopBar;
