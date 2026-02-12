import { GRAPHICS } from "../../User/assets";
import { Button } from "../../User/components";
import React, { useRef, useState, useEffect, useContext } from "react";
import { Icon } from "@iconify/react";
import useOutsideClick from "../../User/hooks/useClickOutside";
import { signOutUser } from "../../../firebase/firebase";
import "./topbar.scss";
import { useNavigate } from "react-router-dom";
import {
  getUserProfile,
  getUserDataForCurrentUser,
} from "../../../firebase/firebase";
import axios from "axios";
import user from "../../../assets/icons/user.png";

import { Dropdown } from "react-bootstrap";
import { MyContext } from "../../../context/context";
const NewTopBar = ({
  heading,
  backArrow,
  onClick,
  onFilterChange,
  totalQuestion,
  solvedQuestionLength,
  isSideMenuOpen,
  toggleSideMenu,
  percentage,

  refreshPoints,
  databasee,
  setDatabasee,
}) => {
  const { value, setValue } = useContext(MyContext);

  const [profile, setProfile] = useState(false);
  const [isNotification, setIsNotification] = useState(true);
  const [showNotifications, setShowNotificatios] = useState(false);
  const [searchShow, setSearchShow] = useState(false);
  const [topbarShow, setTopbarShow] = useState(false);
  const [getSqlType, setSqlType] = useState([]);

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
        console.error("Error fetching user data:", error);
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    if (databasee) {
      // console.log(databasee);
      setDbname(databasee);
    }
  }, [databasee]);

  const navigate = useNavigate();
  const toggleSearchBar = () => {
    setSearchShow(!searchShow);
  };

  const toggleTopBar = () => {
    setTopbarShow(!topbarShow);
  };

  const profileRef = useRef();

  const notificationRef = useRef();

  const searchRef = useRef();
  const searchIconRef = useRef();
  const topbarRef = useRef();

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

  useOutsideClick(topbarRef, () => {
    setTopbarShow(false);
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
  const [dbname, setDbname] = useState("");

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

  const isProduction = process.env.NODE_ENV === "production";
  const apiUrlGetExercises = isProduction
    ? process.env.REACT_APP_API_URL_GET_EXERCISES_PROD
    : process.env.REACT_APP_API_URL_GET_EXERCISES;

  const apiUrlGetTotalPoints = isProduction
    ? process.env.REACT_APP_API_URL_GET_TOTALPOINTS_PROD
    : process.env.REACT_APP_API_URL_GET_TOTALPOINTS;

  const apiUrlGetNotifications = isProduction
    ? process.env.REACT_APP_API_URL_GET_NOTIFICATIONS_PROD
    : process.env.REACT_APP_API_URL_GET_NOTIFICATIONS;

  const apiUrlGetSqlType = isProduction
    ? process.env.REACT_APP_API_URL_GET_SQLTYPE_PROD
    : process.env.REACT_APP_API_URL_GET_SQLTYPE;

  useEffect(() => {
    axios
      .get(apiUrlGetSqlType)
      .then((res) => {
        setSqlType(res.data);
      })
      .catch((error) => {
        console.log(error, "Error in fetching sql type");
      });
  }, []);

  const [getTotalPoints, setGetTotalPoints] = useState("");

  useEffect(() => {
    if (userProfile) {
      // Make GET request when the component mounts
      axios
        .get(`${apiUrlGetTotalPoints}?userId=${userProfile?.uid}`)
        .then((response) => {
          setGetTotalPoints(response.data?.totalPoints);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, [userProfile, refreshPoints]);

  const [databaseData, setDatabaseData] = useState([]);
  const [filters, setFilters] = useState({
    database: "",
    level: "",
    sqlType: "",
  });

  useEffect(() => {
    axios
      .get(apiUrlGetExercises)
      .then((response) => {
        setDatabaseData(response.data);
        // console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleFilterChange = () => {
    const filterData = {
      database: filters.database,
      level: filters.level,
      sqlType: filters.sqlType,
    };
  };

  const handleDatabaseChange = (e) => {
    const selectedDatabaseName = e.target.value;

    // If "Choose Databases" is selected, reset the database filter
    if (selectedDatabaseName === "Choose Databases") {
      setDbname("");
      setDatabasee(null);
      setValue(null);
      return;
    }

    let selectedDatabaseId = null;

    for (let db of databaseData) {
      if (db.ExerciseName === selectedDatabaseName) {
        selectedDatabaseId = db.id;
        setValue(db);
        break;
      }
    }

    setDbname(selectedDatabaseName);
    setDatabasee(selectedDatabaseId);
  };

  useEffect(() => {
    if (databasee) {
      const selectedDb = databaseData.find((db) => db.id === databasee);
      if (selectedDb) {
        setDbname(selectedDb.ExerciseName);
      }
    }
  }, [databasee, databaseData]);

  const handleLevelChange = (e) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      level: e.target.value,
    }));
    handleFilterChange();
  };

  const handleSqlTypeChange = (e) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      sqlType: e.target.value,
    }));
    handleFilterChange();
  };

  onFilterChange(filters);

  const [notification, setNotifications] = useState([]);
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

  useEffect(() => {
    // console.log(value);
  }, [value]);

  return (
    <>
      <div className="new_topbar ">
        <div className="top">
          <div className="search_section new">
            <div className="levels">
              <div className="dropdown">
                <div className="icon">
                  <Icon
                    icon="mynaui:database"
                    color="#797c7f"
                    width="20"
                    height="20"
                  />
                </div>
                <select value={dbname} onChange={handleDatabaseChange}>
                  <option>Choose Databases</option>
                  {databaseData.map((e) => (
                    <option key={e.ExerciseName} value={e.ExerciseName}>
                      {e.ExerciseName}
                    </option>
                  ))}
                </select>
              </div>

              {/* <div className="dropdown">
                <div className="icon">
                  <Icon
                    icon="fluent-mdl2:survey-questions"
                    color="#797c7f"
                    width="20"
                    height="20"
                  />
                </div>
                <select value={filters.yourQuestionProperty}>
                  <option value="">Choose Questions</option>
                  <option value="Free">Free</option>
                  <option value="Premium">Premium</option>
                </select>
              </div> */}

              <div className="dropdown">
                <div className="icon">
                  <Icon
                    icon="streamline:hard-disk"
                    color="#797c7f"
                    width="20"
                    height="20"
                  />
                </div>
                <select value={filters.level} onChange={handleLevelChange}>
                  <option value="">Choose Difficulty</option>
                  <option value="Easy">easy</option>
                  <option value="Medium">medium</option>
                  <option value="Hard">hard</option>
                </select>
              </div>

              <div className="dropdown">
                <div className="icon">
                  <Icon
                    icon="ph:file-sql"
                    color="#797c7f"
                    width="20"
                    height="20"
                  />
                </div>
                <select value={filters.sqlType} onChange={handleSqlTypeChange}>
                  <option value="">Choose Sql Type</option>
                  {getSqlType.map((e) => {
                    return (
                      <option key={e.sqlType} value={e.sqlType}>
                        {e.sqlType}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>

            <p>
              Question Solved {solvedQuestionLength} of {totalQuestion} (
              {isNaN(percentage) ? 0 : percentage}% )
            </p>
            {getTotalPoints > 0 ? (
              <p>Total Points: {getTotalPoints}</p>
            ) : (
              <p>Total Points: 0</p>
            )}
            {/* <div className="search_bar">
              <input type="text" placeholder="Search" />

              <img src={GRAPHICS.Search_Icon} alt="" />
            </div> */}
          </div>
          <div className="dropdown">
            <div className="icon" onClick={handleDropdownToggle}></div>

              <Dropdown
                show={showDropdown}
                onToggle={handleDropdownToggle}
                onClose={handleDropdownClose}
                className="notification-dropdown"
              >
                <Dropdown.Toggle variant="secondary" id="dropdown-basic" className="notification-toggle">
                  <Icon icon="iconoir:bell-notification" />
                </Dropdown.Toggle>

                <Dropdown.Menu className="notification-menu" style={{ minWidth: 320, padding: 0, borderRadius: 12, boxShadow: '0 4px 24px rgba(0,0,0,0.12)' }}>
                  <div style={{ maxHeight: 350, overflowY: 'auto', background: '#fff', borderRadius: 12 }}>
                    {notification?.length === 0 ? (
                      <div style={{ padding: '32px 0', textAlign: 'center', color: '#888', fontSize: 15 }}>
                        <Icon icon="mdi:bell-off-outline" width="32" height="32" style={{ marginBottom: 8 }} />
                        <div>No notifications</div>
                      </div>
                    ) : (
                      notification.map((notification, index) => (
                        <div key={index} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: '18px 20px', borderBottom: index !== notification.length - 1 ? '1px solid #f0f0f0' : 'none', background: '#fff', transition: 'background 0.2s' }} className="notification-item">
                          <Icon icon="mdi:bell-outline" width="24" height="24" color="#4a90e2" style={{ flexShrink: 0, marginTop: 2 }} />
                          <div style={{ flex: 1, fontSize: 15, color: '#222', lineHeight: 1.5 }}>{notification.body}</div>
                        </div>
                      ))
                    )}
                  </div>
                </Dropdown.Menu>
              </Dropdown>
          </div>

          <div className="toggle_icon">
            {isSideMenuOpen ? (
              <>
                <Icon
                  icon="raphael:cross"
                  width="50"
                  height="38"
                  color="white"
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
                  color="white"
                  className="side_menu_icon  "
                  onClick={toggleSideMenu}
                />
              </>
            )}

            <div
              className="dropdown_icon"
              onClick={toggleTopBar}
              ref={topbarRef}
            >
              {topbarShow ? (
                <>
                  <Icon
                    icon="iconamoon:arrow-up-2-light"
                    color="white"
                    width="50"
                    height="38"
                    rotate={2}
                  />
                </>
              ) : (
                <>
                  <Icon
                    icon="iconamoon:arrow-up-2-light"
                    color="white"
                    width="50"
                    height="38"
                  />
                </>
              )}
            </div>
          </div>

          <div className="profile_section">
            <div
              className="search_icon"
              onClick={toggleSearchBar}
              ref={searchIconRef}
            >
              <Icon icon="il:search" color="white" width="22" height="22" />
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
                      : user
                  }
                  alt=""
                  className="profile_img"
                />
                {/* <span>
                  {userProfile && userProfile.displayName
                    ? userProfile.displayName
                    : "Danielle Campbell"}
                </span> */}
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
                      <button
                        onClick={SignOut}
                        active
                        className="logout_btn_new"
                      >
                        Logout
                      </button>
                      {/* <Button logout text={"Logout"} onClick={SignOut} active /> */}
                    </div>
                    {isAdmin && (
                      <div>
                        <button
                          onClick={() => {
                            navigate("/admin-dashboard");
                          }}
                          className="switch_btn"
                        >
                          Switch to admin
                        </button>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        <div
          className={`bottom ${
            topbarShow
              ? "showtopbarbtn"
              : searchShow
              ? "showtopbar"
              : "hidetopbar"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {" "}
          <div className="search_bar">
            <input type="text" placeholder="Search" />

            <img src={GRAPHICS.Search_Icon} alt="" />
          </div>
          <div className="levels">
            <div className="dropdown">
              <div className="icon">
                <Icon
                  icon="mynaui:database"
                  color="#797c7f"
                  width="20"
                  height="20"
                />
              </div>
              <select name="" id="">
                <option value="">choose Databases</option>

                <option value="">Product analytics</option>
                <option value="">Sales analytics</option>
              </select>
            </div>

            <div className="dropdown">
              <div className="icon">
                <Icon
                  icon="fluent-mdl2:survey-questions"
                  color="#797c7f"
                  width="20"
                  height="20"
                />
              </div>
              <select name="" id="">
                <option value="">choose Questions</option>

                <option value="">Free</option>
                <option value="">Premium</option>
              </select>
            </div>

            <div className="dropdown">
              <div className="icon">
                <Icon
                  icon="streamline:hard-disk"
                  color="#797c7f"
                  width="20"
                  height="20"
                />
              </div>
              <select name="" id="">
                <option value="">choose Difficulty</option>

                <option value="">Easy</option>
                <option value="">Medium</option>
                <option value="">Hard</option>
              </select>
            </div>

            <div className="dropdown">
              <div className="icon">
                <Icon
                  icon="ph:file-sql"
                  color="#797c7f"
                  width="20"
                  height="20"
                />
              </div>

              <select name="" id="">
                <option value="">choose Sql Type</option>

                <option value="">Basic</option>
                <option value="">Intermediate</option>
                <option value="">Advance</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewTopBar;
