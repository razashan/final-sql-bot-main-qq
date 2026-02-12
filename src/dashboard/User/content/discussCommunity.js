import React, { useState, useEffect } from "react";
import DiscussionDetails from "./discussionDetails";
import { DiscussionCard, CustomModal } from "../components";
import { Modal } from "react-bootstrap";
import { Button } from "../components";
import { Icon } from "@iconify/react";
import axios from "axios";
import { getUserProfile } from "../../../firebase/firebase";
import { toast } from "react-toastify";

const DiscussCommunity = ({ backBtn }) => {

  const isProduction = process.env.NODE_ENV === "production";
  const apiUrlAskQuestion = isProduction
    ? process.env.REACT_APP_API_URL_ASK_QUESTION_PROD
    : process.env.REACT_APP_API_URL_ASK_QUESTION;

  const apiUrlGetQuestions = isProduction
    ? process.env.REACT_APP_API_URL_GET_ASK_QUESTION_PROD
    : process.env.REACT_APP_API_URL_GET_ASK_QUESTION;






  const [showDiscussion, setShowDiscussion] = useState(false);
  const [show, setShow] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [questionText, setQuestionText] = useState("");
  const [questionData, setQuestionData] = useState([]);
  const [apostQuestion , setPostQuestion]= useState(false);


  // Get user data
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

  const postQuestion = async () => {
    const userId = userProfile?.uid;
  
  
    if (questionText !== "") {
      try {
        // Post the question
        await axios.post(apiUrlAskQuestion, {
          userId: userId,
          question: questionText,
        });
  
        toast.success("Question posted successfully!");
        setQuestionText("");
        setPostQuestion(true);
        setShow(false);
  
        // Fetch updated list of questions
        await axios.get(apiUrlGetQuestions)
          .then((res) => {
  
            setQuestionData(res.data);
          })
          .catch((error) => {
            console.log("Error in fetching updated question data", error);
          });
  
      } catch (error) {
        console.error("Error posting question:", error);
      }
    }
  };
  

  // Get Questions
  useEffect(() => {
  
    axios.get(apiUrlGetQuestions).then((res) => {
  
      setQuestionData(res.data);
    }).catch((error) => {
      console.log("Error in fetching question data", error);
    })
  }, [userProfile])


  const [showAllQuestions, setShowAllQuestions] = useState(false);

  return (
    <>
      {showDiscussion ? (
        <DiscussionDetails
          backCommunity={() => setShowDiscussion(null)}
          questionData={showDiscussion}
        />
      ) : (
        <div className="discussion_community">
          <Icon icon="ep:back" width="35" height="35" onClick={backBtn} />
          <div className="ask_question_btn">
            <h1>Questions :</h1>

            <div className="askbtn">
              <Button
                text="Ask Question"
                active={true}
                onClick={() => setShow(true)}
              />
              <Modal
                centered
                size="lg"
                show={show}
                onHide={() => setShow(false)}
                aria-labelledby="example-modal-sizes-title-lg"
              >
                <Modal.Header closeButton>
                  <div className="custom_modal_head">
                    <div className="question_icon">
                      <Icon
                        icon="octicon:question-24"
                        width="28"
                        height="28"
                      />
                    </div>
                    <div className="heading">
                      <h4>Question</h4>
                    </div>
                  </div>
                </Modal.Header>
                <Modal.Body className="modal_body_flex">
                  <div className="custom_modal_body">
                    <div>
                      <p>Add Your Question</p>
                      <textarea
                        name="question"
                        id="question"
                        placeholder="Ask question.."
                        cols="80"
                        rows="10"
                        value={questionText}
                        onChange={(e) => setQuestionText(e.target.value)} // Update the questionText state
                      ></textarea>
                    </div>
                  </div>
                  <div className="custom_modal_btn">
                    <Button
                      text="Add Question"
                      active={"active"}
                      onClick={postQuestion} // Use the postQuestion function
                    />
                  </div>
                </Modal.Body>
              </Modal>
            </div>
          </div>

          <div className="discussion_cards">
            {(questionData &&
              (showAllQuestions
                ? questionData
                : questionData.slice(0, 10))
            ).map((data, index) => (
              <div key={index} onClick={() => setShowDiscussion(data)}>
                <DiscussionCard questionBody={data.question} index={index + 1} />
              </div>
            ))}
          </div>

          {questionData && questionData.length > 10 && !showAllQuestions && (
            <div className="load_more_btn">
              <Button
                text="Load More"
                active={true}
                onClick={() => setShowAllQuestions(true)}
              />
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default DiscussCommunity;
