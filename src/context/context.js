import React, { createContext, useEffect, useState } from "react";
import { getUserProfile } from "../firebase/firebase";
import axios from "axios";
// Create the context
const MyContext = createContext();

// Create the provider component
const MyProvider = ({ children }) => {
  const [solvedQuestionIds, setSolvedQuestionIds] = useState([]);
  const [value, setValue] = useState(null);
  const [totalQuestionsSolvedByUser, setTotalQuestionsSolvedByUser] =
    useState(0);
  const [user, setUser] = useState(null);
  const isProduction = process.env.NODE_ENV === "production";
  const apiUrlTrackProgress = isProduction
    ? process.env.REACT_APP_API_URL_TRACK_PROGRESS_PROD
    : process.env.REACT_APP_API_URL_TRACK_PROGRESS;
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user) {
          const progressResponse = await axios.get(
            ` ${apiUrlTrackProgress}?userId=${user.uid}`
          );
          let progress = progressResponse.data;
          setTotalQuestionsSolvedByUser(
            progress?.map((data) => data.TotalQuestionsSolved)
          );
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [user]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const profile = await getUserProfile();
        // console.log(profile, "useruser");
        setUser(profile);
      } catch (error) {
        // Handle errors if necessary
        console.error("Error fetching user profile:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <MyContext.Provider
      value={{
        value,
        setValue,
        totalQuestionsSolvedByUser,
        setTotalQuestionsSolvedByUser,
        solvedQuestionIds,
        setSolvedQuestionIds,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};

export { MyContext, MyProvider };
