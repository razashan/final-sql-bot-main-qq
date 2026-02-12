import { React, useState, useEffect } from "react";
import { Button, CustomModal } from "../components";
import { GRAPHICS } from "../assets";
import { Icon } from "@iconify/react";
import { getAllUsers, getUserProfile } from '../../../firebase/firebase';
import axios from "axios";
import { toast } from "react-toastify";

const DiscussionDetails = ({ backCommunity, questionData }) => {


  const [show, setShow] = useState(false);
  const paragraphStyle = {
    marginLeft: "30px", // Adjust the value to set the desired amount of space
  };
  const mrleft = {
    marginLeft: "45px", // Adjust the value to set the desired amount of space
  };
  const mrleftmore = {
    marginLeft: "65px", // Adjust the value to set the desired amount of space
  };
  const isProduction = process.env.NODE_ENV === "production";
  const apiUrlPostAnswer = isProduction
    ? process.env.REACT_APP_API_URL_ANSWER_QUESTION_PROD
    : process.env.REACT_APP_API_URL_ANSWER_QUESTION;


    const apiUrlGetAnswer = isProduction
    ? process.env.REACT_APP_API_URL_GET_ANSWER_PROD
    : process.env. REACT_APP_API_URL_GET_ANSWER;


   
  const [currentUser, setCurrentUser] = useState(null);

  const [userData, setData] = useState([]);
  const [filteredUserData, setFilteredUserData] = useState([]);
  const [answerText, setAnswerText] = useState("");
  const [answerData, setAnswerData]= useState([]);
  // GET CURRENT USER

  useEffect(() => {
    const fetchData = async () => {
      try {
        const profile = await getUserProfile();
        setCurrentUser(profile);

      } catch (error) {

        console.error("Error fetching user profile:", error);
      }
    };

    fetchData();
  }, []);



  // GET ALL USERS

  useEffect(() => {
    const fetchData = async () => {
      try {
        const profile = await getAllUsers();
        setData(profile);


        const userIds = questionData.userId;

        const filteredUsers = profile.filter(user => userIds.includes(user.uid));
        setFilteredUserData(filteredUsers);
        

      } catch (error) {

        console.error("Error fetching user profile:", error);
      }
    };

    fetchData();
  }, []); // Add questionData as a dependency to re-run the effect when it changes

 

  const postAnswer = async () => {
    const questionId = questionData.id;
    const userId = currentUser?.uid;
    if(!answerText){
      alert("empty answer")
      return
    }

    try {
      // Make sure to add the actual data you want to send in the request
      const response = await axios.post(apiUrlPostAnswer, {
        userId: userId,
        questionId: questionId,
        answer: answerText, // Include the value from the textarea
      });
      toast.success("Answer posted!");
      getAnswers();
      // Handle the response if needed

    } catch (error) {
      console.error("Error posting answer:", error);
    }
  };

  const getAnswers=async()=>{

    axios.get(`${apiUrlGetAnswer}?questionId=${questionData?.id}`).then((res)=>
    { 
     setAnswerData(res.data.answers);
   
   }
     ).catch((error)=>{
       console.log("Error in fetching answer data", error);
     })
  }
  useEffect(()=>{
getAnswers();
  },[])





  return (
    <>
      <div className="discussion_details_main_sec">
        <Icon icon="ep:back" width="35" height="35" onClick={backCommunity} />

        <div className="ask_question_btn">
          <h1>Question detail :</h1>

        </div>

        <div className="discussion_details_sec">
          <div className="question_sec">
            <div className="question_box">
              <h6 className="question_box_heading">
                <div className="user">
                  <div className="profile_img">
                    
                   {filteredUserData[0]?.image   ? <img src={filteredUserData[0]?.image} alt="img" />
                   :   <img src="/images/profile-pic.png" alt="" />
                  }
                  </div>

                  <p>  {filteredUserData[0]?.firstName}</p>

                </div>

              </h6>

              <p className="question_box_content">
                {questionData.question}
              </p>
            </div>
            <div className="comment_box">
              <textarea
                name="answer"
                id="question"
                placeholder="Write your answer.."
                cols="122.5"
                rows="7"
                value={answerText}
                onChange={(e) => setAnswerText(e.target.value)}
              ></textarea>

              <div className="comment_box_btn">
                <Button
                  text={"Post Your Answer"}
                  active={"active"}
                  onClick={postAnswer}
                />
              </div>
            </div>


            {/* Answers Boxes section -------------------------------------------------------------------------------------->>> */}
            <div className="answers_box">
            <h2>Answers</h2>
            {answerData && answerData?.map((data, index) => {
  // Find the user in userData based on userId
  const user = userData.find(user => user.uid === data.userId);

  return (
    
    <div key={index} className="answer_box">
    
      <div className="answer_top">
        <div className="answer_image">
          {/* Check if user is found and display the user's image */}
          {user?.image ? (
  <img height="20" width="20" src={user?.image}  />
) : (
  <img src="/images/profile-pic.png" alt="" />
  // <img height="20" width="20" src={GRAPHICS.Profile} alt="profile image" />
)}

        </div>
        <div className="answer_heading">
          {/* Check if user is found and display the user's name */}
          {user && <h6>{user.firstName}</h6>}
        </div>
      </div>
      <div className="answer_content">
        <p>{data.body}</p>
      </div>
      {/* <div className="answer_bottom">
        <div className="bottom_icons">
          <img src={GRAPHICS.Comment_Gray} alt="Comment Icon" />
          <span>321</span>
        </div>
        <div className="bottom_icons">
          <img src={GRAPHICS.Like_Gray} alt="Comment Icon" />
          <span>1556k</span>
        </div>
        <div className="bottom_icons">
          <img src={GRAPHICS.Share_Arrow} alt="Comment Icon" />
        </div>
      </div> */}
    </div>
  );
})}


         

            </div>
          </div>
          {/* 
          <div className="related_question_sec">
            <div className="question_box">
              <h6 className="question_box_heading">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
                non lacus gravida?
              </h6>

              <p className="question_box_content">
                <p>{"float rand(vec2 co) { "}</p>
                <p style={paragraphStyle}>
                  {
                    "return fract(sin(dot(co, vec2(12.9898, 78.233))) * 43758.5453); } "
                  }
                </p>
                <p>
                  {"void mainImage( out vec4 fragColor, in vec2 fragCoord ) "}
                </p>
                <p style={mrleft}>{"{ // Normalized pixel coordinates  ) "}</p>
                <p style={mrleft}>
                  {" (from 0 to 1) vec2 uv = fragCoord/iResolution.xy;  "}
                </p>
                <p>{"float iDotSize = 0.01; "}</p>
                <p style={mrleft}>
                  {
                    "// Normalized dot size (0 to 1) float iMaxDotDistance = iDotSize * 2.0; // "
                  }
                </p>
                <p>
                  {
                    "Calculate the dot position by adding a random offset float dotOffset  "
                  }
                </p>
                <p style={mrleft}>
                  {"= (rand(uv) * 2.0 - 1.0) * iMaxDotDistance;  "}
                </p>
                <p style={mrleft}>{" vec2 dotPosition = uv + dotOffset; "}</p>
                <p style={mrleft}>
                  {
                    "   // Calculate the dot size based on the desired radius float dotSize  "
                  }
                </p>
                <p style={mrleftmore}>{" = iDotSize * iResolution.x;  "}</p>
                <p style={mrleft}>
                  {
                    " // Sample the color from the input image at the dot position vec3 dotColor = texture(iChannel0, dotPosition).rgb; "
                  }
                </p>
                <p style={mrleft}>
                  {
                    "  // Render the dot if (distance(uv, dotPosition) < dotSize)  "
                  }
                </p>
                <p style={mrleft}>
                  {" { fragColor = vec4(dotColor, 1.0); } ) "}
                </p>
                <p>
                  {
                    "else { // Render the background fragColor = texture(iChannel0, uv); "
                  }
                </p>
                <p>{"fragColor = vec4(0.0); } //fragColor = vec4(0.0);"}</p>
              </p>
            </div>

            <h5 className="related_question_heading">Related Questions :</h5>

            <div className="related_questions_boxes">
              <div className="question_box">
                <h6 className="question_box_heading">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Mauris non lacus gravida?
                </h6>

                <p className="question_box_content">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Mauris non lacus gravida, tristique tellus consectetur,
                  iaculis turpis. Aliquam neque lacus, rutrum at pulvinar vel,
                  faucibus ac est. Mauris condimentum porttitor posuere. Orci
                  varius natoque penatibus et magnis dis parturient montes,
                  nascetur ridiculus mus. Sed velit nibh, porta ut quam sit
                  amet, sollicitudin venenatis velit.
                </p>
              </div>

              <div className="question_box">
                <h6 className="question_box_heading">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Mauris non lacus gravida?
                </h6>

                <p className="question_box_content">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Mauris non lacus gravida, tristique tellus consectetur,
                  iaculis turpis. Aliquam neque lacus, rutrum at pulvinar vel,
                  faucibus ac est. Mauris condimentum porttitor posuere. Orci
                  varius natoque penatibus et magnis dis parturient montes,
                  nascetur ridiculus mus. Sed velit nibh, porta ut quam sit
                  amet, sollicitudin venenatis velit.
                </p>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default DiscussionDetails;
