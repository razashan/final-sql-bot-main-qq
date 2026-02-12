import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import "./adddatabse.scss";
import { Icon } from "@iconify/react";
import OpenExercises from "../exercises/OpenExercise";
import axios from "axios";
import { ClipLoader } from "react-spinners";

function AddDatabase(props) {
  const navigate = useNavigate();
  const routeChange = () => {
    let path = `/admin-dashboard`;
    navigate(path);
  };

  const isProduction = process.env.NODE_ENV === "production";

  const getExercisesNames = isProduction
    ? process.env.REACT_APP_API_URL_GET_EXERCISE_NAME_PROD
    : process.env.REACT_APP_API_URL_GET_EXERCISE_NAME;

  const { setActiveInnerFilter, setActiveFilter } = props;

  const [activeTab, setActiveTab] = useState(null);
  const [getExercisesData, setGetExerciseData] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true); // New loading state
  const [reload, setReload] = useState(false);

  const handleTabClick = (target) => {
    setActiveTab(target);
  };

  const setExercise = () => {
    setActiveInnerFilter("Exercises");
    setActiveFilter("Exercises");
  };

  const createExercise = (item) => {
    setOpen(true);
    setSelectedExercise(item);
  };

  const reloadData = () => {
    setReload(!reload);
  };
  const [selectedExercise, setSelectedExercise] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true); // Set loading to true before making the API call
        const response = await axios.get(getExercisesNames);
        setGetExerciseData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle error if needed
      } finally {
        setLoading(false); // Set loading to false when the API call is complete
      }
    };

    fetchData();
  }, [getExercisesNames, open, reload]);

  return (
    <div>
      {open ? (
        <OpenExercises
          backBtn={() => {
            setOpen(false);
          }}
          selectedExercise={selectedExercise}
          reloadData={reloadData}
        />
      ) : (
        <section className="add-database">
          <div className="left">
            <div className="uppar">
              <h2>Uploaded Databases</h2>
              {/* <button>Create database</button> */}
            </div>
            <div className="nav">
              {loading ? (
                <div style={{ position: "absolute", top: "50%", left: "60%" }}>
                  <ClipLoader color="black" size={25} />
                </div>
              ) : (
                getExercisesData.map((item, index) => (
                  <button
                    key={index}
                    className={`nav-link ${
                      activeTab === item.target ? "active" : ""
                    }`}
                    onClick={() => {
                      handleTabClick(item.target);
                      createExercise(item);
                    }}
                  >
                    <p>{item.ExerciseName}</p>
                    {activeTab === item.target ? (
                      <a href="#">
                        <img
                          onClick={() => createExercise(item)}
                          src="/icons/editblue.svg"
                          alt="..."
                        />
                      </a>
                    ) : (
                      <a href="#">
                        <img src="/icons/edit.svg" alt="..." />
                      </a>
                    )}
                  </button>
                ))
              )}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

export default AddDatabase;
