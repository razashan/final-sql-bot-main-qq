import React, { useState } from "react";
import "./account.css";
import googleicon from "../../assets/icons/google_icon.png";
import { Link, useNavigate } from "react-router-dom";
import { GRAPHICS } from "../../assets";
import { Icon } from "@iconify/react";
import {
  registerWithEmailAndPassword,
  signInWithGoogle,
} from "../../firebase/firebase";
import axios from "axios";

const Signup = () => {
  const isProduction = process.env.NODE_ENV === "production";

  const apiUrlAddUser = isProduction
    ? process.env.REACT_APP_API_URL_ADD_USER_PROD
    : process.env.REACT_APP_API_URL_ADD_USER;

  const apiUrlWelcome = isProduction
    ? process.env.REACT_APP_API_URL_WELCOME_EMAIL_PROD
    : process.env.REACT_APP_API_URL_WELCOME_EMAIL;

  const navigate = useNavigate();

  const initialFormData = {
    Firstname: "",
    Lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.Firstname) {
      newErrors.Firstname = "First name is required";
    }

    if (!formData.Lastname) {
      newErrors.Lastname = "Last name is required";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const user = await registerWithEmailAndPassword(
          formData.email,
          formData.password,
          formData.confirmPassword,
          formData.Firstname,
          formData.Lastname
        );

        // Send welcome email
        await axios.post(apiUrlWelcome, {
          email: formData.email,
          name: `${formData.Firstname} ${formData.Lastname}`,
        });

        setFormData(initialFormData);
        navigate("/user-dashboard");
      } catch (err) {
        console.error("Signup failed:", err.message);
      }
    }
  };

  const signInwithGoogle = async () => {
    const userData = await signInWithGoogle();
    if (userData) {
      try {
        await axios.post(apiUrlAddUser, {
          uid: userData.uid,
          name: userData.displayName,
        });

        await axios.post(apiUrlWelcome, {
          email: userData.email,
          name: userData.displayName,
        });

        navigate("/user-dashboard");
      } catch (error) {
        console.error(
          "Error posting user data or sending welcome email:",
          error.message
        );
      }
    } else {
      // alert("User already exists or sign-in failed");
      navigate("/login");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div>
      <div className="sign-up-wrapper sign-up-wrapper2">
        <div className="top_right">
          <img src={GRAPHICS.Account_Top_Right} alt="" />
        </div>

        <div className="bottom_right">
          <img src={GRAPHICS.Account_Bottom_Right} alt="" />
        </div>

        <div className="account_elips">
          <img src={GRAPHICS.Account_Elips} alt="" />
        </div>

        <h1>create account</h1>
        <div className="signup">
          <form onSubmit={handleSubmit}>
            <div className="sign-up-input">
              <label>
                <input
                  type="text"
                  name="Firstname"
                  placeholder="Firstname"
                  value={formData.Firstname}
                  onChange={handleInputChange}
                  maxLength={15}
                />
                {errors.Firstname && (
                  <div className="error">{errors.Firstname}</div>
                )}
              </label>

              <label>
                <input
                  type="text"
                  name="Lastname"
                  placeholder="Lastname"
                  value={formData.Lastname}
                  onChange={handleInputChange}
                  maxLength={15}
                />
                {errors.Lastname && (
                  <div className="error">{errors.Lastname}</div>
                )}
              </label>

              <label>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
                {errors.email && <div className="error">{errors.email}</div>}
              </label>

              <label style={{ display: "flex" }}>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleInputChange}
                  minLength={6}
                  maxLength={15}
                />
                <div>
                  {showPassword ? (
                    <Icon icon="oi:eye" onClick={togglePasswordVisibility} />
                  ) : (
                    <Icon icon="ci:hide" onClick={togglePasswordVisibility} />
                  )}
                </div>
                {errors.password && (
                  <div className="error">{errors.password}</div>
                )}
              </label>

              <label style={{ display: "flex" }}>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  minLength={6}
                  maxLength={15}
                />
                <div>
                  {showConfirmPassword ? (
                    <Icon
                      icon="oi:eye"
                      onClick={toggleConfirmPasswordVisibility}
                    />
                  ) : (
                    <Icon
                      icon="ci:hide"
                      onClick={toggleConfirmPasswordVisibility}
                    />
                  )}
                </div>
                {errors.confirmPassword && (
                  <div className="error">{errors.confirmPassword}</div>
                )}
              </label>

              <button className="signup-button">Sign up</button>
            </div>
          </form>

          <div>
            <p>
              <Link to="/login">Already have Account ? </Link>
            </p>
          </div>

          <div>
            <p>or continue with</p>
          </div>
          <div className="social-icon">
            <div>
              <a href="#">
                <img src={googleicon} alt="google" onClick={signInwithGoogle} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
