import "./RegisterPage.css";
import { useRef } from "react";
import axios from "axios";

const RegisterPage = (props) => {
  const nameInputRef = useRef(null);
  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);
  const rePasswordInputRef = useRef(null);

  const registerUser = async (name, email, password, password2) => {
    if (password === password2) {
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
        // props.registerHandler();
        props.loginUser(email, password);
      } catch (result) {
        alert(result.response.data);
      }
    } else {
      alert("Entered Passwords do not match. Try again!");
    }
  };

  const submitHandler = () => {
    const enteredName = nameInputRef.current.value;
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    const reEnteredPassword = rePasswordInputRef.current.value;

    registerUser(enteredName, enteredEmail, enteredPassword, reEnteredPassword);
  };

  const visibilityHandler = () => {
    let textField1 = document.getElementById("password1");
    let textField2 = document.getElementById("password2");
    if (textField1.type === "password") {
      textField1.type = "text";
      textField2.type = "text";
    } else {
      textField1.type = "password";
      textField2.type = "password";
    }
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
            <label className="label">Name</label>
            <input
              className="register-text-field"
              type="text"
              placeholder="Name"
              ref={nameInputRef}
            />
            <label className="label">Email</label>
            <input
              className="register-text-field"
              type="text"
              placeholder="example@email.com"
              ref={emailInputRef}
            />
            <label className="label">Password</label>
            <input
              className="register-text-field"
              type="password"
              placeholder="Password"
              ref={passwordInputRef}
              id="password1"
            />
            <label className="label">Re-enter Password</label>
            <input
              className="register-text-field"
              type="password"
              placeholder="Re-enter Password"
              ref={rePasswordInputRef}
              id="password2"
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
                Register
              </button>
              <button
                className="login-button"
                onClick={() => {
                  props.dispatch({
                    type: "CHANGE_PATH",
                    payload: "login",
                  });
                }}
              >
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
