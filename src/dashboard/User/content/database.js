import React, { useState, useEffect } from "react";
import { DbCard, TopBar } from "../components";
import DatabaseDetails from "./databaseDetails";
import axios from "axios";
import { ClipLoader } from "react-spinners";

const Database = ({
  isSideMenuOpen,
  toggleSideMenu,
  setActiveTab,
  activeTab,
  databasee,
  setDatabasee,
}) => {
  const isProduction = process.env.NODE_ENV === "production";
  const apiUrlGetExercises = isProduction
    ? process.env.REACT_APP_API_URL_GET_EXERCISES_PROD
    : process.env.REACT_APP_API_URL_GET_EXERCISES;

  const [loading, setLoading] = useState(true); // New loading state
  const [showDb, setShowDb] = useState(false);
  const [databaseData, setDatabaseData] = useState([]);
  const [selectedData, setSelectedData] = useState(null);

  // console.log(databasee, "helo jeeeeeeeeeeeeeeeeeeeeee............");

  useEffect(() => {
    // Make GET request when the component mounts
    axios
      .get(apiUrlGetExercises)
      .then((response) => {
        setDatabaseData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        // Handle error
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  const handleDatabaseSelect = (data) => {
    setShowDb(true);
    setSelectedData(data);
    setDatabasee(data.id);
    //setActiveTab("SQL Dashboard"); // Navigate to the dashboard
  };

  return (
    <>
      <div>
        <TopBar
          heading={"Database"}
          isSideMenuOpen={isSideMenuOpen}
          toggleSideMenu={toggleSideMenu}
          search={true}
        />
      </div>

      {showDb ? (
        <>
          <DatabaseDetails
            ExerciseID={selectedData.id}
            databaseName={selectedData.ExerciseName}
            databaseDescription={selectedData.exerciseDescription}
            difficultyLevel={selectedData.DifficultyLevel}
            backBtn={() => {
              setShowDb(false);
            }}
            setActiveTab={setActiveTab}
            activeTab={activeTab}
            databasee={databasee}
            setDatabasee={setDatabasee}
          />
        </>
      ) : (
        <div className="database_section">
          <p style={{ textAlign: "left", fontSize: "20px", fontWeight: "500" }}>
            Here are the different databases to choose from before you start
            practicing. We recommend selecting a database based on your
            background, specialization, or domain interest in analytics. These
            databases have been carefully curated by FAANG industry experts
            across various fields to provide an exceptional hands-on gitlearning
            experience.
          </p>

          <div className="list_heading">
            <h1>List of Uploaded Databases</h1>
          </div>

          <div className="db_cards">
            {loading ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <ClipLoader color="black" size={25} />
              </div>
            ) : (
              databaseData.map((data) => (
                <div>
                  <DbCard
                    key={data.id}
                    text={data.ExerciseName}
                    onClick={() => handleDatabaseSelect(data)}
                  />

                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <button
                      className="join_btn"
                      style={{
                        borderRadius: "10px",
                        paddingLeft: "15px",
                        paddingRight: "15px",
                        paddingTop: "10px",
                        paddingBottom: "10px",
                        fontSize: "16px",
                        marginTop: "20px",
                        height: "fit-content",
                      }}
                      onClick={() => handleDatabaseSelect(data)}
                    >
                      Get Started
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Database;
