import "./RegisterPage.css";
import { useRef } from "react";
import axios from "axios";

const RegisterPage = (props) => {
  const nameInputRef = useRef(null);
  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);

  const registerUser = async (name, email, password) => {
    try {
      const result = await axios.post(
        `https://localhost:8080/api/quiz-page//users/register`,
        {
          user_name: name,
          user_email: email,
          password: password,
          admin: false,
        }
      );
      alert(result.data);
      props.loginHandler(); // or use registerHandler to go back to login page to get token
    } catch (result) {
      alert(result.response.data);
    }
  };

  const submitHandler = () => {
    const enteredName = nameInputRef.current.value;
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    registerUser(enteredName, enteredEmail, enteredPassword);
  };

  return (
    <div>
      <div>
        <div className="register-main">
          <h1>Create Account</h1>
          <p>
            To create new account, please fill out the form below and click
            register
          </p>
          <div className="register-container">
            <div>
              <label className="label">Name</label>
              <input
                className="register-text-field"
                type="text"
                placeholder="Name"
                ref={nameInputRef}
              />
            </div>
            <div>
              <label className="label">Email</label>
              <input
                className="register-text-field"
                type="text"
                placeholder="example@email.com"
                ref={emailInputRef}
              />
            </div>
            <div>
              <label className="label">Password</label>
              <input
                className="register-text-field"
                type="text"
                placeholder="Password"
                ref={passwordInputRef}
              />
            </div>
            <div className="button-container">
              <button className="login-button" onClick={submitHandler}>
                Register
              </button>
              <button className="login-button" onClick={props.registerHandler}>
                Cancle
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
