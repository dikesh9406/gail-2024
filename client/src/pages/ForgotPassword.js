import { useState } from "react";
import { FormRow, Alert } from "../components";
import Wrapper from "../assets/wrappers/RegisterPage";
import { useNavigate, Link } from "react-router-dom";
import Logo from "../components/Logo.js"
import Logo2 from "../components/Logo2.js"
import React from 'react';

import { useAppContext } from "../context/appContext";

const initialState = {
  email: "",
};

const ForgotPassword = () => {
  const [values, setValues] = useState(initialState);
  const { isLoading, showAlert, displayAlert, resetPassword , link_sent} =
    useAppContext();

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { email } = values;

    if (!email) {
      displayAlert("Please provide your email.");
      return;
    }
    else{
        link_sent({
            
            alertText: "Password has been sent to your email id",
          });

    }
    resetPassword(email);
  };

  return (
    <React.Fragment>
          <nav style={{ display: 'flex', justifyContent: 'space-between', boxShadow: '0 2px 0px rgba(0, 0, 0, 0.2)' }}>
            <div style={{ marginTop: '12px' }}>
          <Logo  />
          </div>
          <Logo2 />
        </nav>
    <Wrapper >
            
      <form className="form" onSubmit={onSubmit}>
        <h3>Forgot Password</h3>
        {showAlert && <Alert />}
        {/* email input */}
        <FormRow
            type="email"
            name="email"
            value={values.email}
            handleChange={handleChange}
            placeholder="Type Your Email"
          />
        <button type="submit" className="btn btn-block" disabled={isLoading}>
          Reset Password
        </button>
      

        <p>
  <Link to="/register" style={{ color: '#2cb1bc' }}>Sign in</Link>
</p>
      </form>
    </Wrapper>
    </React.Fragment>

  );
};

export default ForgotPassword;
