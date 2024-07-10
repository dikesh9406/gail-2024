import React, { useState } from "react";
import { FormRow, Alert } from "../../components";
import { useAppContext } from "../../context/appContext";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const Profile = () => {
  const { user, showAlert,passAlert, displayAlert, updateUser, isLoading } = useAppContext();
  const [name, setName] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);
  const [lastName, setLastName] = useState(user?.lastName);
  const [location, setLocation] = useState(user?.location);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !lastName || !location) {
      displayAlert();
      return;
    }
    if (password !== confirmPassword) {
      passAlert();
      return;
    }
    updateUser({ name, email, lastName, location, password });
  };

  return (
    <>
      <div style={{ textAlign: "center", width: "100%" }}>
        <h3 style={{ color: "#3f51b5" }}>Profile</h3>
      </div>
      <Wrapper>
        <form className="form" onSubmit={handleSubmit}>
          <h3>Profile</h3>
          {showAlert && <Alert />}
          <div className="form-center">
            <FormRow
              type="text"
              name="name"
              value={name}
              handleChange={(e) => setName(e.target.value)}
            />
            <FormRow
              type="text"
              labelText="last name"
              name="lastName"
              value={lastName}
              handleChange={(e) => setLastName(e.target.value)}
            />
            <FormRow
              type="email"
              name="email"
              value={email}
              handleChange={(e) => setEmail(e.target.value)}
            />
            <FormRow
              type="text"
              name="location"
              value={location}
              handleChange={(e) => setLocation(e.target.value)}
            />
            <div className="form-row">
              <label htmlFor="password" className="form-label">
                Password/Change password
              </label>
              <div className="password-input-container">
                <input
                  type={isPasswordVisible ? "text" : "password"}
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-input"
                />
                <span
                  className="password-toggle-icon"
                  onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                >
                  <FontAwesomeIcon icon={isPasswordVisible ? faEyeSlash : faEye} />
                </span>
              </div>
            </div>
            <div className="form-row">
              <label htmlFor="confirmPassword" className="form-label">
                Confirm Password
              </label>
              <div className="password-input-container">
                <input
                  type={isPasswordVisible ? "text" : "password"}
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="form-input"
                />
                <span
                  className="password-toggle-icon"
                  onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                >
                  <FontAwesomeIcon icon={isPasswordVisible ? faEyeSlash : faEye} />
                </span>
              </div>
            </div>
            <button className="btn btn-block" type="submit" disabled={isLoading}>
              {isLoading ? "Please Wait 🌞" : "Save changes"}
            </button>
          </div>
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
    </>
  );
};

export default Profile;
