import React, { useContext, useEffect, useState } from "react";
import { TopBar } from "../components";
import { GRAPHICS } from "../assets";
import axios from "axios";
import { getUserProfile } from "../../../firebase/firebase";
import ProgressBar from "react-bootstrap/ProgressBar";
import { useAsyncError } from "react-router-dom";
import { MyContext } from "../../../context/context";
const UserLevel = ({ isSideMenuOpen, toggleSideMenu }) => {
  // apis d
  const isProduction = process.env.NODE_ENV === "production";

  const apiUrlTotalQuestion = isProduction
    ? process.env.REACT_APP_API_URL_GET_TOTAL_NUMBER_OF_QUESTIONS_PROD
    : process.env.REACT_APP_API_URL_GET_TOTAL_NUMBER_OF_QUESTIONS;

  const apiUrlGetSolvedExercises = isProduction
    ? process.env.REACT_APP_API_URL_GET_SOLVED_EXERCISES_PROD
    : process.env.REACT_APP_API_URL_GET_SOLVED_EXERCISES;

  const apiUrlGetLeaderboard = isProduction
    ? process.env.REACT_APP_API_URL_LEADERBOARD_PROD
    : process.env.REACT_APP_API_URL_LEADERBOARD;

  const apiUrlGetAchivements = isProduction
    ? process.env.REACT_APP_API_URL_GET_ACIEVEMENTS_PROD
    : process.env.REACT_APP_API_URL_GET_ACIEVEMENTS;
  const apiUrlTrackProgress = isProduction
    ? process.env.REACT_APP_API_URL_TRACK_PROGRESS_PROD
    : process.env.REACT_APP_API_URL_TRACK_PROGRESS;

  const apiUrlPostAchievement = isProduction
    ? process.env.REACT_APP_API_URL_POST_ACHIEVEMENT_PROD
    : process.env.REACT_APP_API_URL_POST_ACHIEVEMENT;

  const apiUrlTrackSqlTypeProgress = isProduction
    ? process.env.REACT_APP_API_URL_SQL_TYPE_PROGRESS_PROD
    : process.env.REACT_APP_API_URL_SQL_TYPE_PROGRESS;

  const apiUrlGetTotalExercisePoints = isProduction
    ? process.env.REACT_APP_API_URL_GET_EXERCISE_POINTS_PROD
    : process.env.REACT_APP_API_URL_GET_EXERCISE_POINTS;

  const apiUrlAddNotification = isProduction
    ? process.env.REACT_APP_API_URL_NOTIFICATION_PROD
    : process.env.REACT_APP_API_URL_NOTIFICATION;

  const [leaderData, setLeaderData] = useState([]);
  const [userProfile, setUserProfile] = useState([]);
  const [data, setData] = useState([]);
  const [progressData, setProgressData] = useState([]);
  const [sqlTypeProgress, setSqlTypeProgress] = useState([]);
  const [totalQuestion, setTotalQuestion] = useState([]);
  const [user, setUser] = useState(null);
  const [leaderboardId, setLeaderBoardId] = useState("");
  const [totalQuestionsSolved, setTotalQuestionsSolved] = useState("");
  const [totalExercisesSolved, setTotalExercisesSolved] = useState("");
  const [achievements, setAchievements] = useState([]);
  const [exercisePointsData, setExercisePointsData] = useState([]);
  const [solvedExercise, setSolvedExercise] = useState([]);

  // Get all profiles data from firebase
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

  // Get leaderboard data

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(apiUrlGetLeaderboard);
        setLeaderData(response.data);
      } catch (error) {
        console.error("Error fetching leaderboard data:", error);
      }
    };
    fetchData();
  }, []);

  // Use the effect hook to update the 'data' array when 'leaderData' or 'userProfile' changes
  useEffect(() => {
    const newData = leaderData?.map((leader, index) => {
      if (userProfile?.uid === leader.userId) {
        return {
          name: userProfile?.displayName,
          totalPoints: leader?.totalPoints,
          rank: index + 1,
        };
      }
      return null;
    });

    // Filter out null values from newData
    const filteredData = newData.filter((item) => item !== null);

    setData(filteredData);
  }, [leaderData, userProfile]);

  // Get current user data

  useEffect(() => {
    const fetchData = async () => {
      try {
        const profile = await getUserProfile();
        setUser(profile);
      } catch (error) {
        // Handle errors if necessary
        console.error("Error fetching user profile:", error);
      }
    };

    fetchData();
  }, []);

  // GET EXERSICE COUNT

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user) {
          // Fetch progress data
          const progressResponse = await axios.get(
            `${apiUrlTrackProgress}?userId=${user.uid}`
          );
          setProgressData(progressResponse.data[0]);
          let progress = progressResponse.data;

          // console.log(progress, "progress");
          setLeaderBoardId(progress?.map((data) => data.totalPoints));
          setTotalQuestionsSolved(
            progress?.map((data) => data.TotalQuestionsSolved)
          );

          // Fetch solved exercises data
          const solvedExercisesResponse = await axios.get(
            `${apiUrlGetSolvedExercises}?userId=${user.uid}`
          );
          const solvedExercisesData = solvedExercisesResponse.data;
          setSolvedExercise(solvedExercisesData);

          const totalExercisesSolvedByUser = solvedExercisesData.length;

          setTotalExercisesSolved(totalExercisesSolvedByUser);

          axios
            .get(`${apiUrlGetAchivements}?userId=${user.uid}`)
            .then((res) => {
              setAchievements(res.data);
            })
            .catch((error) => {
              console.log(error);
            });
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [user, apiUrlTrackProgress, apiUrlGetSolvedExercises]);

  const [maxProgressTypes, setMaxProgressTypes] = useState([]);
  const [minProgressTypes, setMinProgressTypes] = useState([]);
  const [sqlTypeProgressPercentage, setSqlTypeProgressPercentage] = useState(
    []
  );

  useEffect(() => {
    axios
      .get(`${apiUrlTrackSqlTypeProgress}?userId=${userProfile?.uid}`)
      .then((res) => {
        setSqlTypeProgress(res.data);
        // console.log(res.data, "res.data");

        // Calculate progress percentage
        const progressPercentage = res.data.map((entry) => {
          // console.log(entry.SolvedQuestions, "entry.SolvedQuestions");
          const totalQuestions = entry.TotalQuestions || 1; // handle zero or undefined TotalQuestions
          const progressPercentage =
            (entry.SolvedQuestions / totalQuestions) * 100;
          return {
            ...entry,
            ProgressPercentage: isNaN(progressPercentage)
              ? 0
              : progressPercentage, // handle NaN
          };
        });

        setSqlTypeProgressPercentage(progressPercentage);

        // Sort by progress percentage in descending order
        const sortedProgress = progressPercentage.sort(
          (a, b) => b.ProgressPercentage - a.ProgressPercentage
        );

        // Take the top and bottom 3 SQL types
        const topThree = sortedProgress.slice(0, 3);
        const bottomThree = sortedProgress.slice(-3);

        // Set the state with top 3 and bottom 3 SQL types along with their percentages
        setMaxProgressTypes(topThree);
        setMinProgressTypes(bottomThree);
      });
  }, [userProfile, solvedExercise]);

  useEffect(() => {
    let userId = userProfile?.uid;

    const fetchExercisePoints = async () => {
      try {
        const exerciseData = [];

        for (const data of solvedExercise) {
          const url = `${apiUrlGetTotalExercisePoints}?exerciseName=${data?.ExerciseName}&userId=${userId}`;

          const response = await axios.get(url);

          exerciseData.push({
            exerciseName: data?.ExerciseName,
            points: response.data[0],
          });
        }

        setExercisePointsData(exerciseData);
      } catch (error) {
        console.error("Error fetching exercise points:", error);
      }
    };

    fetchExercisePoints();
  }, [userProfile, solvedExercise]);

  // post achivement
  useEffect(() => {
    const addAchievement = async () => {
      try {
        if (
          !userProfile ||
          !exercisePointsData ||
          exercisePointsData.length === 0
        ) {
          throw new Error(
            "User profile or exercisePointsData is missing or empty."
          );
        }
        const userId = userProfile.uid;
        for (const data of exercisePointsData) {
          const { exerciseName, points } = data;
          const TotalPoints = Number(points.TotalPoints);
          const ObtainedPoints = Number(points.ObtainedPoints);
          if (
            isNaN(TotalPoints) ||
            isNaN(ObtainedPoints) ||
            ObtainedPoints === 0
          ) {
            console.error("Invalid points data:", points);
            continue;
          }
          const percentage = Math.round((ObtainedPoints / TotalPoints) * 100);
          const medal =
            percentage > 95 ? "gold" : percentage >= 85 ? "silver" : "bronze";

          try {
            const achievementResponse = await axios.post(
              apiUrlPostAchievement,
              {
                userId,
                exerciseName,
                medal,
              }
            );

            // Post notification
            try {
              const notificationResponse = await axios.post(
                apiUrlAddNotification,
                {
                  userId,
                  body: `Exercise ${exerciseName} completed, with ${medal} medal`,
                  is_general: true,
                }
              );
            } catch (notificationError) {
              console.error("Error posting notification:", notificationError);
            }
          } catch (achievementError) {
            console.error("Error posting achievement:", achievementError);
          }
        }
      } catch (error) {
        console.error(
          "Error processing achievements and notifications:",
          error
        );
      }
    };

    if (exercisePointsData && exercisePointsData.length > 0) {
      addAchievement();
    }
  }, [userProfile, exercisePointsData]);

  return (
    <>
      <div>
        <TopBar
          heading={"User Level"}
          isSideMenuOpen={isSideMenuOpen}
          toggleSideMenu={toggleSideMenu}
        />
      </div>

      <div className="user_level">
        <div className="achievements">
          <div className="profile">
            <h1>User Level and achievements </h1>

            <div className="profile_img">
              <img
                style={{ width: "169%", height: "100%" }}
                src={
                  userProfile && userProfile.photoURL
                    ? userProfile.photoURL
                    : GRAPHICS.Profile
                }
              />
            </div>

            <div className="user_data">
              <h2>{userProfile?.displayName}</h2>
              <h3>{userProfile?.title}</h3>
            </div>
          </div>

          <div className="medals">
            <h5>
              MEDALS <span>{achievements?.length}</span>{" "}
            </h5>
            <div className="medal_cards">
              {achievements &&
                achievements?.map((data, index) => (
                  <div key={index} className="medal_card">
                    <div className="icon">
                      <img src={GRAPHICS.Medal_Gold} alt="Gold Medal" />
                    </div>
                    <h1>{data.medal}</h1>
                    <button className="gold_btn">{data?.exerciseName}</button>
                  </div>
                ))}
            </div>
          </div>
        </div>
        <img className="center_line_img" src={GRAPHICS.Breaking_Line} />
        <div className="activity_and_certification">
          <h4>ACTIVITY</h4>
          <div className="activity">
            <div className="activity_card">
              <img src={GRAPHICS.Quiz_Icon} alt="Quiz Icon" />
              <div className="points">
                {totalExercisesSolved ? (
                  <>
                    <h1>{totalExercisesSolved}</h1>
                    <span>Exercises</span>
                  </>
                ) : (
                  <>
                    <h3>0</h3>
                    <span>Exercises</span>
                  </>
                )}
              </div>
            </div>

            <div className="activity_card">
              <img src={GRAPHICS.Leader_board_icon} alt="Leaderboard Icon" />
              <div className="points">
                {totalQuestionsSolved > 0 ? (
                  <>
                    <h1>{totalQuestionsSolved}</h1>
                    <span>Questions</span>
                  </>
                ) : (
                  <>
                    <h3>0</h3>
                    <span>Questions</span>
                  </>
                )}
              </div>
            </div>

            <div className="activity_card">
              <img src={GRAPHICS.Accuracy_Icon} alt="Accuracy Icon" />

              <div className="points">
                {data.length > 0 ? (
                  data.map((item, index) => (
                    <div key={index}>
                      <h1>{item?.totalPoints}</h1>
                      <span>Total Points</span>
                    </div>
                  ))
                ) : (
                  <div>
                    <h3>0</h3>
                    <span>Total Points</span>
                  </div>
                )}
              </div>
            </div>

            <div className="activity_card">
              <img src={GRAPHICS.Recall_icon} alt="Recall Icon" />
              <div className="points">
                {data.length ? (
                  data.map((item, index) => (
                    <div key={index}>
                      <h2>#{item?.rank}</h2>
                      <span>Leaderboard</span>
                    </div>
                  ))
                ) : (
                  <div>
                    <h3>0</h3>
                    <span>Leaderboard</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="strongest">
            <div className="strongest_card_wrapper">
              <h3>STRONGEST TOPICS</h3>{" "}
              <div className="strongest_card">
                <div className="strongest_box">
                  <div className="heading">
                    {maxProgressTypes.map((entry) => (
                      <div
                        key={entry.sqlType}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          marginBottom: "20px",
                        }}
                      >
                        <div className="strong_img">
                          <img src={GRAPHICS.Back_End} alt="Back End" />
                        </div>
                        <div style={{ marginLeft: "10px" }}>
                          <h1>{entry.sqlType}</h1>
                          <ProgressBar
                            now={entry.ProgressPercentage}
                            label={`${entry.ProgressPercentage.toFixed(0)}%`}
                            max={100}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="strongest_card_wrapper">
              <h3>WEAKEST TOPICS</h3>
              <div className="strongest_card">
                <div className="strongest_box">
                  <div className="heading">
                    {minProgressTypes.map((entry) => (
                      <div
                        key={entry.sqlType}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          marginBottom: "20px",
                        }}
                      >
                        <div className="strong_img">
                          <img
                            src={GRAPHICS.Strongest_Python}
                            alt="Strongest Python"
                          />
                        </div>
                        <div style={{ marginLeft: "10px" }}>
                          <h1>{entry.sqlType}</h1>
                          <ProgressBar
                            now={entry.ProgressPercentage}
                            label={`${entry.ProgressPercentage.toFixed(0)}%`}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* <h4>CERTIFICATIONS 8</h4>
          <div className="certification">
            <div className="medal_card">
              <div className="icon">
                <img src={GRAPHICS.Certification_Sql} />
              </div>
              <h1>SQL</h1>
              <button className="gold_btn">Bronze Certified</button>
            </div>

            <div className="medal_card">
              <div className="icon">
                <img src={GRAPHICS.Certification_Learn} />
              </div>
              <h1>Learn Python </h1>
              <button className="silver_btn">Silver Certified</button>
            </div>

            <div className="medal_card">
              <div className="icon">
                <img src={GRAPHICS.Python_Basic} />
              </div>
              <h1>Python basics</h1>
              <button className="bronze_btn">Bronze Certified</button>
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default UserLevel;
