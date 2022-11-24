import "./LoginPage.css";
import { useRef } from "react";
import axios from "axios";

const LoginPage = (props) => {
  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);

  const loginUser = async (email, password) => {
    try {
      const result = await axios.post(
        `https://localhost:8080/api/quiz-page//users/login`,
        {
          user_email: email,
          password: password,
        }
      );
      const token = result.data.data.token;
      if (token) {
        props.loginHandler();
      }
    } catch (result) {
      alert(result.response.data);
    }
  };

  const submitHandler = () => {
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    loginUser(enteredEmail, enteredPassword);
  };

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
              ref={emailInputRef}
            />
          </div>
          <div>
            <label className="label">Password</label>
            <input
              className="login-text-field"
              type="text"
              placeholder="Password"
              ref={passwordInputRef}
            />
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
