import "./LoginPage.css";
import { useState } from "react";

const LoginPage = (props) => {
  return (
    <div>
      <div className="login-main">
        <h1>Welcome to the Quiz Page!</h1>
        <p>Please Login or create new user account by registering</p>
        <div className="login-container">
          <div>
            <label className="label">User Name</label>
            <input
              className="login-text-field"
              type="text"
              placeholder="User Name"
            />
          </div>
          <div>
            <label className="label">Password</label>
            <input
              className="login-text-field"
              type="text"
              placeholder="Password"
            />
          </div>
          <div className="button-container">
            <button className="login-button">Login</button>
            <button className="login-button" onClick={props.registerHandler}>
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
