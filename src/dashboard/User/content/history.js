import React, { useState, useEffect } from "react";
import { HistoryCard, TopBar } from "../components";
import axios from "axios";
import Dashboard from "../../newUser/newuserdashboard/dashboard";
import { getUserProfile } from "../../../firebase/firebase";
import { ClipLoader } from "react-spinners";

const History = ({ isSideMenuOpen, toggleSideMenu }) => {
  const isProduction = process.env.NODE_ENV === "production";
  const apiUrlGetBookmarks = isProduction
    ? process.env.REACT_APP_API_URL_GET_BOOKMARK_PROD
    : process.env.REACT_APP_API_URL_GET_BOOKMARK;

  const [bookmarkData, setBookmarkData] = useState([]);
  const [userProfile, setUserProfile] = useState(null);
  const [selectedBookmark, setSelectedBookmark] = useState(null);
  const [showDashboard, setShowDashboard] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const profile = await getUserProfile();
        setUserProfile(profile);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    let userId = userProfile?.uid;

    if (userId) {
      const apiUrl = `${apiUrlGetBookmarks}?userId=${userId}`;
      setLoading(true);
      axios
        .get(apiUrl)
        .then((res) => {
          // console.log("Bookmark API response:", res.data);
          setBookmarkData(res.data);
        })
        .catch((error) => {
          console.error("Error fetching bookmarks:", error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [userProfile?.uid]);

  const handleCardClick = (bookmark) => {
    setSelectedBookmark(bookmark);
    setShowDashboard(true);
  };

  return (
    <>
      {showDashboard ? (
        <div className="Book_mark">
          <Dashboard
            bookmark={selectedBookmark}
            isSideMenuOpen={isSideMenuOpen}
            toggleSideMenu={toggleSideMenu}
            isAdmin={false}
            activeTab="Bookmarks"
            setActiveTab={() => {}}
            databasee={selectedBookmark?.exercise_id || null}
            setDatabasee={() => {}}
            closeDashboard={() => setShowDashboard(false)}
          />
        </div>
      ) : (
        <>
          <div>
            <TopBar
              heading={"History"}
              isSideMenuOpen={isSideMenuOpen}
              toggleSideMenu={toggleSideMenu}
              search={true}
            />
          </div>

          <div className="history_section">
            <div className="saved_questions">
              <div className="history_heading">
                <h1> Saved Questions :</h1>
              </div>

              <div className="history_cards">
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
                  bookmarkData?.map((bookmark) => (
                    <div
                      onClick={() => handleCardClick(bookmark)}
                      key={bookmark?.bookmarkId}
                    >
                      <HistoryCard
                        bookmarkId={bookmark?.bookmarkId}
                        bookmarkedQuestionId={bookmark?.bookmarkedQuestionId}
                        bookmarkedUserId={bookmark?.bookmarkedUserId}
                        questionName={bookmark?.QuestionName}
                      />
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default History;
