import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./account.css";
import googleicon from "../../assets/icons/google_icon.png";
import { Link } from "react-router-dom";
import { GRAPHICS } from "../../assets";
import { toast } from "react-toastify";
import { Icon } from "@iconify/react";

import {
  loginWithEmailAndPassword,
  signInWithGoogle,
} from "../../firebase/firebase";

const Login = ({ onLogin }) => {
  const adminEmail = process.env.REACT_APP_ADMIN_EMAIL;
  const adminPassword = process.env.REACT_APP_ADMIN_PASSWORD;


  const [loggedInAsAdmin, setLoggedInAsAdmin] = useState(false);

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email || !password) {
      setErrors({
        email: !email ? "Email is required" : "",
        password: !password ? "Password is required" : "",
      });
      return;
    }

    try {
      if (email === adminEmail && password === adminPassword) {
        navigate("/admin-dashboard");
        setLoggedInAsAdmin(true);
        onLogin(true); // Call onLogin with false when logged in as a regular user


      } else {
        const loginSuccess = await loginWithEmailAndPassword(email, password);
        if (loginSuccess) {
          navigate("/user-dashboard");
          setLoggedInAsAdmin(false);
          onLogin(false); // Call onLogin with false when logged in as a regular user

        } else {
          console.log("Login failed");
        }
      }
    } catch (e) {
      console.log("error");
    }
  };
 

  const handleGoogleLogin = async () => {
    const loginSuccess = await signInWithGoogle();

    if (loginSuccess) {
      navigate("/user-dashboard");
    } else {
      console.log('Login Failed');
    }
  };

  const handleUserNameChange = (event) => {
    setEmail(event.target.value);
    setErrors({ ...errors, email: "" });
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setErrors({ ...errors, password: "" });
  };
  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div>
      <div className="sign-up-wrapper">
        <div className="top_right">
          <img src={GRAPHICS.Account_Top_Right} />
        </div>

        <div className="bottom_right">
          <img src={GRAPHICS.Account_Bottom_Right} />
        </div>

        <div className="account_elips">
          <img src={GRAPHICS.Account_Elips} />
        </div>
        <div className="signup">
          <h1 className="login_heading">login</h1>
          <form onSubmit={handleSubmit}>
            <div className="sign-up-input">
              <label>
                <input
                  type="text"
                  placeholder="Email"
                  value={email}
                  maxLength={40}
                  onChange={handleUserNameChange}
                />
                {errors.email && <div className="error">{errors.email}</div>}
              </label>

              <label style={{display:'flex'}}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  value={password}
                  onChange={handlePasswordChange}
                  minLength={6}
                  maxLength={15}
                  
                />
                <div>
                {showPassword ? (
        <Icon  icon="oi:eye"  onClick={togglePasswordVisibility}></Icon>
      ) : (
      
        <Icon   icon="ci:hide"  onClick={togglePasswordVisibility}></Icon>
      )}
               
                </div>
        
                
                {errors.password && (
                  <div className="error">{errors.password}</div>
                )}
              </label>

              <button
                type="submit"
                className="signup-button"
              // onClick={() => navigate("/")}
              >
                Sign in
              </button>
            </div>
          </form>

          <div className="d-flex w-100 flex-row mt-2 justify-content-between signuplink">
            <p>
              {" "}
              <Link to="/forget">Forgot Your Password ?</Link>
            </p>
            <p>
              <Link to="/signup">Create Account</Link>
            </p>
          </div>

          <div>
            <p>or continue with</p>
          </div>

          <div className="social-icon">
            {/* <div>
              <Link to="#">
                {" "}
                <img src={facebookicon} alt="fb" />
              </Link>
            </div> */}
            <div>
              <Link to="#">
                <img src={googleicon} alt="fb" onClick={handleGoogleLogin} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
