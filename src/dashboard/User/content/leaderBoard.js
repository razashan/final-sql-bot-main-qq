import React, { useEffect, useState } from "react";
import { GrayButton, TopBar, WinnerCard } from "../components";
import { GRAPHICS } from "../assets";
import axios from "axios";
import {
  getAllUsers,
  getUserDisplayNameById,
} from "../../../firebase/firebase";

const LeaderBoard = ({ isSideMenuOpen, toggleSideMenu }) => {
  // Apis

  const isProduction = process.env.NODE_ENV === "production";
  const apiUrlGetLeaderboard = isProduction
    ? process.env.REACT_APP_API_URL_LEADERBOARD_PROD
    : process.env.REACT_APP_API_URL_LEADERBOARD;

  const [leaderData, setLeaderData] = useState([]);
  const [userProfile, setUserProfile] = useState([]);

  const [data, setData] = useState([]);
  const [updatedAt, setUpdatedAT] = useState("");

  // Get all users data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const profile = await getAllUsers();
        setUserProfile(profile);
      } catch (error) {
        // Handle errors if necessary
        console.error("Error fetching user profile:", error);
      }
    };

    fetchData();
  }, []);

  const fetchUserById = async (uid) => {
    try {
      const profile = await getUserDisplayNameById(uid);
      return profile;
    } catch (error) {
      // Handle errors if necessary
      console.error("Error fetching user profile:", error);
    }
  };

  // Get leaderboard data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(apiUrlGetLeaderboard);
        const now = new Date();
        const latestUpdatedAt = new Date(
          Math.max(
            ...response.data.map((item) => new Date(item.updatedAt).getTime())
          )
        );
        const timeDiff = (now.getTime() - latestUpdatedAt.getTime()) / 1000;
        let updatedAtString;
        if (timeDiff < 60) {
          updatedAtString = `${Math.ceil(timeDiff)} sec ago`;
        } else if (timeDiff < 3600) {
          updatedAtString = `${Math.ceil(timeDiff / 60)} min ago`;
        } else if (timeDiff < 86400) {
          updatedAtString = `${Math.ceil(timeDiff / 3600)} hours ago`;
        } else {
          updatedAtString = `${latestUpdatedAt
            .getDate()
            .toString()
            .padStart(2, "0")}-${(latestUpdatedAt.getMonth() + 1)
            .toString()
            .padStart(2, "0")}-${latestUpdatedAt.getFullYear()}`;
        }
        setUpdatedAT(updatedAtString);
        setLeaderData(response.data);
      } catch (error) {
        // Handle errors if necessary
        console.error("Error fetching leaderboard data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const updateData = async () => {
      if (userProfile) {
        const newDataPromises = leaderData.map(async (leader) => {
          const user = userProfile.find(
            (profile) => profile.uid === leader.userId
          );

          // Use await to wait for the asynchronous fetchUserById function to complete
          if (user) {
            const userData = await fetchUserById(user?.uid);
            const displayName = `${userData.firstName} ${userData.lastName}`;

            return {
              name: displayName,
              image: userData?.image,
              Total: leader.totalPoints,
            };
          } else {
            return {
              name: "",
              Total: "",
            };
          }
        });

        // Use Promise.all to wait for all the promises in newDataPromises array to resolve
        const newData = await Promise.all(newDataPromises);

        setData(newData);
      }
    };

    updateData();
  }, [leaderData, userProfile]);


  return (
    <>
      <div className="leaderboard_topbar">
        <TopBar
          heading={"Leader Board"}
          isSideMenuOpen={isSideMenuOpen}
          toggleSideMenu={toggleSideMenu}
        />
      </div>

      <div className="leader_board">
        <div className="winning_section">
          <div className="cone_images">
            <img
              className="cone_left"
              src={GRAPHICS.Cone_Left}
              alt="Cone Image"
            />
            <img
              className="cone_right"
              src={GRAPHICS.Cone_Right}
              alt="Cone Image"
            />
          </div>

          <div className="winners">
            {data.slice(0, 3).map((item, index) => (
              <div key={item.id} className="winner_one">
                <div className="winner_img">
                  <img style={{ borderRadius: "50%" }} src={item.image} />

                  {index === 0 && (
                    <img
                      src={GRAPHICS.crown_gold}
                      alt="Gold Crown"
                      className="crown"
                    />
                  )}
                  {index === 1 && (
                    <img
                      src={GRAPHICS.crown_silver}
                      alt="Silver Crown"
                      className="crown"
                    />
                  )}
                  {index === 2 && (
                    <img
                      src={GRAPHICS.crown_light_gold}
                      alt="Bronze Crown"
                      className="crown"
                    />
                  )}
                </div>

                <div className="winner_name"> {item.name}</div>
                <div className="winner_points">{item.Total} Points</div>
              </div>
            ))}
          </div>
        </div>

        <div className="winner_details">
          <div className="heading">
            <h1>Leaderboard</h1>
            <GrayButton text={`Updated: ${isNaN(updatedAt) ? "15h ago" : updatedAt}`} />
          </div>

          <div className="winner_list">
            {data.map((item, index) => (
              <WinnerCard
                key={index} // Don't forget to add a unique key when using map
                name={item.name} // Corrected property name
                noOfQuestions={item.Total} // Corrected property name
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default LeaderBoard;
