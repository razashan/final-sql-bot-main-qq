import React, { useState, useEffect, useRef, forwardRef } from "react";
import { TopBar } from "../components";
import { GRAPHICS } from "../assets";
import { Button } from "../components";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import userDummyProf from "../../../assets/icons/user.png"

import {
  editUserProfile,
  getUserDataForCurrentUser,
  uploadImg,
  signOutUser,
} from "../../../firebase/firebase";

import { toast } from "react-toastify";
import { useAccounts } from "../hooks/accounts";

const UserProfile = ({ isSideMenuOpen, toggleSideMenu }) => {
  const navigate = useNavigate();
  const isProduction = process.env.NODE_ENV === "production";
  const getTotalPoints = isProduction
    ? process.env.REACT_APP_API_URL_GET_TOTALPOINTS_PROD
    : process.env.REACT_APP_API_URL_GET_TOTALPOINTS;

  const [totalPoint, setTotalPoints] = useState(null);
  const {accounts}= useAccounts();

  useEffect(()=>{
    // console.log(accounts, "accout here");

  },[accounts])

  const [userData, setUserData] = useState([]);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    title: "",
    aboutMe: "",
  });
  
  const [errors, setErrors] = useState({
    firstName: false,
    lastName: false,
    title: false,
    aboutMe: false,
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  
  };
  

  const onSubmit = async (e) => {
  e.preventDefault();
  const validationErrors = {
    firstName: !formData.firstName,
    lastName: !formData.lastName,
    title: !formData.title,
    aboutMe: !formData.aboutMe,
  };

  setErrors(validationErrors);

  if (Object.values(validationErrors).some((error) => error)) {
    return; // Exit early if there are validation errors
  }

    try {
      // Assuming editUserProfile is an asynchronous function
      await editUserProfile(formData);
      toast.success("Changes Saved Successfully");
  
      getUserData();
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };
  
const handleCancel = (e) => {
  setFormData(userData);
};
const [user, setUser] = useState(null);

useEffect(() => {
  const storedUserSignIn = localStorage.getItem("signIn");
  if (storedUserSignIn) {
    const userSignInObject = JSON.parse(storedUserSignIn);
    setUser(userSignInObject);

  } else {
    console.log("User Sign-In Object not found in localStorage");
  }
}, []);

// get updated data

const getUserData = async () => {
  getUserDataForCurrentUser()
    .then((data) => {

      setUserData(data);
      setFormData({
        firstName: data?.firstName,
        lastName: data?.lastName,
        title: data?.title,
        aboutMe: data?.aboutMe,
      });
    })
    .catch((error) => {
      console.error("Error fetching user data:", error);
    });
};

useEffect(() => {
  getUserData();
}, []);
const [selectedImage, setSelectedImage] = useState(null);
const [previewImage, setPreviewImage] = useState(null);
const fileInputRef = useRef();

const handleImageChange = (e) => {
  const file = e.target.files[0];

  if (file) {
    setSelectedImage(file);
    setPreviewImage(URL.createObjectURL(file));
  }
};

const handleUpload = async () => {

  if (selectedImage) {
    // Upload the image and get the URL
    const imageUrl = await uploadImg(selectedImage);


    // Set the uploaded image URL in the state (if you want to show it after upload)
    setPreviewImage(imageUrl);
    toast.success("Image is uploaded");
  } else {
    toast.error("No Image selected!");
  }
};

const triggerFileInput = () => {
  fileInputRef.current.click();
};

useEffect(() => {
  const fetchTotalPoints = async () => {

    try {
      const response = await axios.get(
        `${getTotalPoints}?userId=${userData?.uid}`
      );

      setTotalPoints(response.data.totalPoints);
    } catch (error) {
      console.error("Error fetching total points:", error);
    }
  };

  if (userData?.uid) {
    fetchTotalPoints();
  }
}, [userData, getTotalPoints]);

// logout
const SignOut = () => {
  signOutUser();
  navigate("/");
};
return (
  <>
    <div>
      <TopBar
        heading={"Profile"}
        isSideMenuOpen={isSideMenuOpen}
        toggleSideMenu={toggleSideMenu}
      />
    </div>
    <div className="profile_content">
      {/* Profile section ------------------------------------------------------------------------------------ */}
      <div className="profile_section">
        <p className="user_prof_heading">User Profile</p>
        <div className="profile_img">
          <input
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleImageChange}
            ref={fileInputRef}
          />

          <img
            src={
              previewImage || userData?.image || userDummyProf
            }
            onClick={triggerFileInput}
            alt="profileImage"
          />
          <Icon
            icon="mdi:camera"
            width={50}
            height={38}
            className="side_menu_icon ProfileIcon"
            color="gray"
            onClick={triggerFileInput}
          />
        </div>
          <Button
            onClick={handleUpload}
            text="Upload new Image"
            active={"active"}
          />
        <div className="name_desig">
          <h6>
            {userData?.firstName || "Danielle"}{" "}
            {userData?.lastName || "Campbell"}
          </h6>
          <p>{userData?.title || ""}</p>
        </div>
        <div className="details_sec">
          {/* <div className="position">
              <h6>{userData?.position || "21"}</h6>
              <p>Position</p>
            </div> */}
          <div className="points">
            <h6>
              {totalPoint || "0"} <span>Points</span>
            </h6>
          </div>
          {/* <div className="following">
              <h6>{userData?.following || "101"}</h6>
              <p>Following</p>
            </div> */}
        </div>
        <div className="user_prof_footer">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: "none" }}
            ref={fileInputRef}
          />

          <label>
            {/* <Button onClick={triggerFileInput} text={"Upload new image"} active={"active"} /> */}
          </label>
          <h6>{userData?.location || "Uzbekistan, Tashkent"}</h6>
          <div className="user-bio">
            <p>{userData?.aboutMe || ""} </p>
          </div>
        </div>
      </div>

      {/* Profile form section ------------------------------------------------------------------------------------ */}
      <div className="profile_form_section">
        <div className="basic_info">
          <div className="basic_info_heading">
            <h6>Basic Info</h6>
          </div>
          <div className="basic_info_btn">
            <Button text={"CANCEL"} onClick={handleCancel} />
            <Button text={"SAVE"} active={"active"} onClick={onSubmit} />
          </div>
        </div>
        <hr />

        <form>
          <div className="first_last">
            <div className="firstname input_flex">
              <label>FIRST NAME</label>
              <input
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
              // {...register("firstName")}
              />
              {errors.firstName&& <p className="error">Firstname is required</p>}
                
              {/* <p className="error">{errors.firstName?.message}</p> */}
            </div>

            <div className="lastname input_flex">
              <label>LAST NAME</label>
              <input
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
              // {...register("lastName")}
              />
               {errors.lastName&& <p className="error">Lastnmae is required</p>}
              {/* <p className="error">{errors.lastName?.message}</p> */}
            </div>
          </div>

          <div className="title input_flex">
            <label>TITLE</label>
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
            // {...register("title")}
            />
            
            {errors.title&& <p className="error">Title is required*</p>}
            {/* <p className="error">{errors.title?.message}</p> */}
          </div>

          <div className="title input_flex">
            <label>EMAIL</label>
            {/* Assuming user is available in the component's state */}
            <input value={user?.email || userData?.email} disabled />
            {/* Add error handling for email if needed */}
          </div>

          <div className="about_me">
            <h6>ABOUT ME</h6>
            <hr />
          </div>

          <div className="about_me_input">
            <textarea
              name="aboutMe"
              placeholder="Enter about me"
              rows={4}
              value={formData.aboutMe}
              onChange={handleChange}
            // {...register("aboutMe")}
            />
              {errors.aboutMe&& <p className="error">About me is required*</p>}
            {/* <p className="error">{errors.aboutMe?.message}</p> */}
          </div>
        </form>
        <div className="logout_button">
          <Button text={"LOG OUT"} active={"active"} onClick={SignOut} />
        </div>
      </div>
    </div>
    <div></div>
  </>
);
};

export default UserProfile;
