import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { getUserProfile } from "../../../firebase/firebase";
import { MyContext } from "../../../context/context";

// Create the context
const AccountsContext = createContext();

// Create a provider component
export const AccountsProvider = ({ children }) => {
  const [accounts, setAccounts] = useState([]);
  const [user, setUser] = useState(null);
  const [solvedQuestions, setSolvedQuestions] = useState(10);
  const [questionLimitOver, setQuestionLimit] = useState(false);
  const [tab, setTab] = useState("");
  const [accountType, setAccountType] = useState("Free");

  const { totalQuestionsSolvedByUser, setTotalQuestionsSolvedByUser } =
    useContext(MyContext);

  const isProduction = process.env.NODE_ENV === "production";
  const apiUrlCreatePayment = isProduction
    ? process.env.REACT_APP_API_URL_SUBSCRIPTON_DETAILS_PROD
    : process.env.REACT_APP_API_URL_SUBSCRIPTON_DETAILS;

  const updateQuestionLength = (value) => {
    // console.log(value, "value here");
    // setSolvedQuestions(value);
  };

  const updateTab = (value) => {
    setTab(value);
  };
  useEffect(() => {
    // Fetch user profile from Firebase
    const fetchUser = async () => {
      try {
        const userProfile = await getUserProfile();
        // console.log(userProfile, "user profile here");
        setUser(userProfile);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUser();
  }, []);

  // Function to fetch accounts data from the API
  const fetchAccounts = async () => {
    try {
      if (!user || !user.uid) {
        console.warn("User ID is not available yet.");
        return;
      }

      // Use URL parameters instead of query parameters
      // console.log(apiUrlCreatePayment, "api url create");
      const response = await axios.get(`${apiUrlCreatePayment}/${user.uid}`); // Pass user ID in the URL
      setAccountType(response?.data?.accountType);
      setAccounts(response.data); // Assuming the API returns an array of accounts
    } catch (error) {
      console.error("Error fetching accounts:", error);
    }
  };

  // Fetch accounts when the user is set
  useEffect(() => {
    if (user) {
      fetchAccounts();
    }
  }, [user]);

  useEffect(() => {
    // console.log(accountType, "account type here");

    if (accountType === "Free" && totalQuestionsSolvedByUser[0] >= 10) {
      // console.log("here");
      setQuestionLimit(true);
    }
  }, [accountType]);
  useEffect(() => {
    // console.log(totalQuestionsSolvedByUser[0], "totalQuestionsSolvedByUser");
  }, [totalQuestionsSolvedByUser]);

  return (
    <AccountsContext.Provider
      value={{
        accounts,
        setAccounts,
        fetchAccounts,
        updateQuestionLength,
        questionLimitOver,
        tab,
        updateTab,
      }}
    >
      {children}
    </AccountsContext.Provider>
  );
};

// Custom hook to use the Accounts context
export const useAccounts = () => {
  const context = useContext(AccountsContext);
  if (!context) {
    throw new Error("useAccounts must be used within an AccountsProvider");
  }
  return context;
};
