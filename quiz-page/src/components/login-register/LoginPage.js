import "./LoginPage.css";
import { useRef } from "react";

const LoginPage = (props) => {
  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);

  const submitHandler = () => {
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    props.loginUser(enteredEmail, enteredPassword);
  };

  const visibilityHandler = () => {
    let textField = document.getElementById("password");

    if (textField.type === "password") {
      textField.type = "text";
    } else {
      textField.type = "password";
    }
  };

  return (
    <div>
      <div className="login-main">
        <h1>Welcome to the Quiz Page!</h1>
        <p>Please Login or create new user account by registering</p>
        <div className="login-container">
          <label className="label">User Email</label>
          <input
            className="login-text-field"
            type="text"
            placeholder="User Name"
            ref={emailInputRef}
          />
          <label className="label">Password</label>
          <input
            className="login-text-field"
            type="password"
            placeholder="Password"
            ref={passwordInputRef}
            id="password"
          />
          <div className="show-password">
            <input
              type="checkbox"
              className="checkbox"
              onClick={visibilityHandler}
            />
            <label className="checkbox">Show Password</label>
          </div>
          <div className="button-container">
            <button className="login-button" onClick={submitHandler}>
              Login
            </button>
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
