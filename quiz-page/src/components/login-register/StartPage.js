import "./StartPage.css";
import Navbar from "../Navbar";
import { useState } from "react";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import axios from "axios";

const StartPage = (props) => {
  const [register, setRegister] = useState(false);

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
        localStorage.setItem("loginToken", token);
      }
    } catch (result) {
      alert(result.response.data);
    }
  };

  const registerHandler = () => {
    setRegister((current) => !current);
  };

  return (
    <div>
      <Navbar
        isLoggedin={props.isLoggedin}
        appData={props.appData}
        dispatch={props.dispatch}
        registerHandler={registerHandler}
      />
      {!register && (
        <LoginPage
          registerHandler={registerHandler}
          loginHandler={props.loginHandler}
          loginUser={loginUser}
        />
      )}
      {register && (
        <RegisterPage
          registerHandler={registerHandler}
          loginHandler={props.loginHandler}
          loginUser={loginUser}
        />
      )}
    </div>
  );
};

export default StartPage;
