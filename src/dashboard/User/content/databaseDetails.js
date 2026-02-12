import React, { useState, useEffect } from "react";
import { DbButton } from "../components";
import { Icon } from "@iconify/react";
import axios from "axios";
import Practice from "./practice";
// import { useNavigate } from 'react-router-dom';

const DatabaseDetails = ({
  backBtn,
  databaseDescription,
  ExerciseID,
  databaseName,
  setActiveTab,
  activeTab,
  databasee,
  setDatabasee,
}) => {
  const [associatedTables, setAssociatedTables] = useState([]);

  const [startPractice, setStartPractice] = useState(false);

  const isProduction = process.env.NODE_ENV === "production";
  const apiUrlGetExercises = isProduction
    ? process.env.REACT_APP_API_URL_GET_ASSOCIATED_TABLES_PROD
    : process.env.REACT_APP_API_URL_GET_ASSOCIATED_TABLES;

  useEffect(() => {
    // Fetch associated tables when the component mounts
    axios
      .get(`${apiUrlGetExercises}?ExerciseID=${ExerciseID}`)
      .then((response) => {
        // Handle successful response
        const modifiedData = response.data.map((item) => {
          const tableNameParts = item.TableName.split("_");
          const extractedName = tableNameParts[tableNameParts.length - 1];
          return { ...item, TableName: extractedName };
        });
        setAssociatedTables(modifiedData);
      })
      .catch((error) => {
        // Handle error
        console.error("Error fetching associated tables:", error);
      });
  }, [ExerciseID]);
  const handlePractice = () => {
    setDatabasee(ExerciseID); // Update the databasee state
    setActiveTab("SQL Dashboard"); // Navigate to the dashboard
  };

  return (
    <>
      {startPractice ? (
        <div className="Dashboard_Content">
          <Practice
            ExerciseID={ExerciseID}
            backBtn={() => {
              setStartPractice(false);
            }}
          />
        </div>
      ) : (
        <div className="database_details">
          {/* <Icon
          icon="humbleicons:arrow-go-back"
          width="56"
          height="56"
      
        /> */}
          <Icon icon="ep:back" width="40" height="40" onClick={backBtn} />
          {/* <div className="introduction">
            <Icon icon="ep:back" width="40" height="40" onClick={backBtn} />

            <h1>An introduction about soccer Database</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
              non lacus gravida, tristique tellus consectetur, iaculis turpis.
              Aliquam neque lacus, rutrum at pulvinar vel, faucibus ac est.
              Mauris condimentum porttitor posuere. Orci varius natoque
              penatibus et magnis dis parturient montes, nascetur ridiculus mus.
              Sed velit nibh, porta ut quam sit amet, sollicitudin venenatis
              velit.
            </p>
          </div> */}

          <div className="description">
            <h2>{databaseName} Database description:</h2>
            <p>{databaseDescription}</p>
          </div>

          <div className="list_of_table">
            <h3>List of tables in the {databaseName} database:</h3>
            <div className="buttons">
              {associatedTables.map((data, index) => (
                <DbButton
                  key={index}
                  text={data.TableName}
                  onClick={() => {}}
                />
              ))}
            </div>
          </div>

          {/* <DbButton
            text="Start Practice"
            onClick={() => {
              setStartPractice(true);
            }}
          /> */}

          <div>
            <button
              className="join_btn"
              style={{
                borderRadius: "10px",
                paddingLeft: "15px",
                paddingRight: "15px",
                fontSize: "16px",
                marginTop: "10px",
                height: "fit-content",
              }}
              onClick={handlePractice}
            >
              Start SQL Practice Now
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default DatabaseDetails;
