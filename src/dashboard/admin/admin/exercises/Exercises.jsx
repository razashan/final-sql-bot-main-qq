import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

import { getAllUsers } from "../../../../firebase/firebase";

const Exercises = () => {
  const isProduction = process.env.NODE_ENV === "production";
  const apiUrlGetAnalytics = isProduction
    ? process.env.REACT_APP_API_URL_GET_ANALYTICS_PROD
    : process.env.REACT_APP_API_URL_GET_ANALYTICS;

  const getExercises = isProduction
    ? process.env.REACT_APP_API_URL_GET_EXERCISES_PROD
    : process.env.REACT_APP_API_URL_GET_EXERCISES;

  const [getAnalytics, setGetAnalytics] = useState([]);
  const [exerciseId, setExerciseId] = useState("");
  const [exerciseName, setExerciseName] = useState("");
  const [exerciseData, setExerciseData] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [allUserData, setAllUserData] = useState([]);

  // Get all profiles data from firebase
  useEffect(() => {
    const fetchData = async () => {
      try {
        const profile = await getAllUsers();
        setAllUserData(profile.length);
      } catch (error) {
        // Handle errors if necessary
        console.error("Error fetching user profile:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseExercises = await axios.get(getExercises);
        const exercisesData = responseExercises.data;
        setExerciseData(exercisesData);

        // Set initial exerciseName and exerciseId
        if (exercisesData.length > 0) {
          setExerciseName(exercisesData[0].ExerciseName);
          setExerciseId(exercisesData[0].id);
        }
      } catch (error) {
        console.error("Error fetching exercise data:", error);
      }
    };

    fetchData();
  }, []);

  const handleExerciseNameChange = (e) => {
    const selectedExerciseName = e.target.value;

    if (selectedExerciseName !== exerciseName) {
      setExerciseName(selectedExerciseName);

      const matchedExercise = exerciseData.find(
        (exercise) => exercise.ExerciseName === selectedExerciseName
      );

      setExerciseId(matchedExercise?.id || "");
    }
  };

  useEffect(() => {
    axios
      .get(`${apiUrlGetAnalytics}?exerciseId=${exerciseId}`)
      .then((res) => {
        setGetAnalytics(res.data.analytics);
      })
      .catch((error) => {
        // console.log("Error in fetching analytics", error);
      });
  }, [exerciseId]);

  useEffect(() => {
    if (exerciseId && getAnalytics.length > 0) {
      const userPoints = [
        {
          solvedAll: getAnalytics.filter((user) => user.has_solved_all === 1)
            .length,
          isMaxPoints: getMaxPoints(),
          isMinPoints: getLowestPoints(),
          attemptingNotCompleted: getAnalytics.filter(
            (user) => user.has_attempted === 1
          ).length,
        },
      ];

      setChartData(userPoints);
    }
  }, [exerciseId, getAnalytics]);

  const getMaxPoints = () => {
    const maxPoints = Math.max(
      ...getAnalytics.map((user) => user.total_points),
      0
    );
    return maxPoints;
  };

  const getLowestPoints = () => {
    const nonZeroPoints = getAnalytics.filter(
      (user) => user.total_points !== 0
    );
    if (nonZeroPoints.length > 0) {
      return Math.min(...nonZeroPoints.map((user) => user.total_points));
    } else {
      return 0; // If all points are zero, return 0
    }
  };

  return (
    <>
      <div className="analytic-container">
        <div className="exercise-name">
          <h3>Exercise Analytics</h3>
          {/* <label>Select Database Name</label> */}
          <div className="exercise-inner">
            <select
              value={exerciseName}
              onChange={handleExerciseNameChange}
              placeholder="Select Database"
            >
              {exerciseData.map((data, index) => (
                <option key={index} value={data.ExerciseName}>
                  {data.ExerciseName}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="analytics">
          <div className="exercise-analytics">
            <div className="analytics_content">
              {/* <h5>Exercise Summary</h5> */}
              <p>Highest Score Achieved: {getMaxPoints()}</p>
              <p>
                Number of Users Attempted:{" "}
                {getAnalytics.filter((user) => user.has_attempted === 1).length}
              </p>
              <p>
                Number of Users Successfully Completed:{" "}
                {
                  getAnalytics.filter((user) => user.has_solved_all === 1)
                    .length
                }
              </p>
              <p>Lowest Score Recorded: {getLowestPoints()}</p>
            </div>
            <div className="total-user">
              <h5 style={{ display: "inline" }}>Total Users Logged In: </h5>
              <span>{allUserData}</span>
            </div>
          </div>
          <div className="bar-chart">
            <BarChart
              width={600}
              height={300}
              data={chartData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />

              {/* Bar for Users who Solved All Exercises */}
              <Bar dataKey="solvedAll" fill="#82ca9d" name="Solved All" />

              {/* Bar for Users with Maximum Points */}
              <Bar dataKey="isMaxPoints" fill="#ff7300" name="Max Points" />

              {/* Bar for Users with Minimum Points */}
              <Bar dataKey="isMinPoints" fill="#0088fe" name="Min Points" />

              {/* Bar for Users Attempting but Not Completing All Exercises */}
              <Bar
                dataKey="attemptingNotCompleted"
                fill="#ffc658"
                name="Attempting Not Completed"
              />
            </BarChart>
          </div>
        </div>
      </div>
    </>
  );
};

export default Exercises;
