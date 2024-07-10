import { useState, useEffect } from "react";
import { FormRow, Alert } from "../components";
import Wrapper from "../assets/wrappers/RegisterPage";
import { useAppContext } from "../context/appContext";
import { useNavigate, Link } from "react-router-dom";
import Logo from "../components/Logo.js";
import Logo2 from "../components/Logo2.js";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const initialState = {
  name: "",
  email: "",
  password: "",
  isMember: true,
  userType: "",
  secretKey: "",
};

const Register = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState(initialState);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isSecretKeyVisible, setIsSecretKeyVisible] = useState(false);

  const { user, isLoading, showAlert, displayAlert, setupUser } = useAppContext();

  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember });
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    if (values.userType === "Admin" && values.secretKey !== "gail@123") {
      alert("invalid Admin");
      e.preventDefault();
    } else {
      e.preventDefault();
      const { name, email, password, isMember, userType, secretKey } = values;
      if (!email || !password || (!isMember && !name)) {
        displayAlert();
        return;
      }
      const currentUser = { name, email, password, userType };
      if (isMember) {
        setupUser({
          currentUser,
          endPoint: "login",
          alertText: "Login Successful! Redirecting...",
        });
      } else {
        setupUser({
          currentUser,
          endPoint: "register",
          alertText: "User Created! Redirecting...",
        });
      }
    }
  };

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
  }, [user, navigate]);

  return (
    <React.Fragment>
      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          boxShadow: "0 2px 0px rgba(0, 0, 0, 0.2)",
        }}
      >
        <div style={{ marginTop: "12px" }}>
          <Logo />
        </div>
        <Logo2 />
      </nav>
      <Wrapper>
        <form className="form" onSubmit={onSubmit}>
          <h3>{values.isMember ? "Login" : "Register"}</h3>
          {showAlert && <Alert />}
          <div>
            <input
              type="radio"
              name="userType"
              value="User"
              checked={values.userType === "User"}
              onChange={handleChange}
            />
            User
            <input
              type="radio"
              name="userType"
              value="Admin"
              checked={values.userType === "Admin"}
              onChange={handleChange}
            />
            Admin
          </div>
          {values.userType === "Admin" && (
            <div className="form-row">
              <label htmlFor="secretKey" className="form-label">
                Admin Secret Key
              </label>
              <div className="password-input-container">
                <input
                  type={isSecretKeyVisible ? "text" : "password"}
                  name="secretKey"
                  value={values.secretKey}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Admin Secret Key"
                />
                <span
                  className="password-toggle-icon"
                  onClick={() => setIsSecretKeyVisible(!isSecretKeyVisible)}
                >
                  <FontAwesomeIcon icon={isSecretKeyVisible ? faEyeSlash : faEye} />
                </span>
              </div>
            </div>
          )}
          {!values.isMember && (
            <FormRow
              type="text"
              name="name"
              value={values.name}
              handleChange={handleChange}
              placeholder="Type Your Name"
            />
          )}
          <FormRow
            type="email"
            name="email"
            value={values.email}
            handleChange={handleChange}
            placeholder="Type Your Email"
          />
          <div className="form-row">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <div className="password-input-container">
              <input
                type={isPasswordVisible ? "text" : "password"}
                name="password"
                value={values.password}
                onChange={handleChange}
                className="form-input"
                placeholder="Type Your Password"
              />
              <span
                className="password-toggle-icon"
                onClick={() => setIsPasswordVisible(!isPasswordVisible)}
              >
                <FontAwesomeIcon icon={isPasswordVisible ? faEyeSlash : faEye} />
              </span>
            </div>
          </div>
          <button type="submit" className="btn btn-block" disabled={isLoading}>
            submit
          </button>
          <p>
            {values.isMember ? "Not a member yet?" : "Already a member?"}
            <button type="button" onClick={toggleMember} className="member-btn">
              {values.isMember ? "Register" : "Login"}
            </button>
          </p>
          <p>
            <Link style={{ color: "#2cb1bc" }} to="/forgot-password">
              Forgot Password?
            </Link>
          </p>
        </form>
      </Wrapper>
      <style jsx>{`
        .password-input-container {
          display: flex;
          align-items: center;
        }
        .password-toggle-icon {
          margin-left: -30px;
          cursor: pointer;
        }
      `}</style>
    </React.Fragment>
  );
};

export default Register;
