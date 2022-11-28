import "./StartPage.css";
import Navbar from "../Navbar";
import { useState } from "react";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import axios from "axios";
import { Routes, Route } from "react-router-dom";

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
      <Routes>
        <Route
          path="/login"
          element={
            <Navbar
              isLoggedin={props.isLoggedin}
              quizzes={props.quizzes}
              dispatch={props.dispatch}
              registerHandler={registerHandler}
            />
          }
        />
        <Route
          path="/login"
          element={
            !register && (
              <LoginPage
                registerHandler={registerHandler}
                loginHandler={props.loginHandler}
                loginUser={loginUser}
              />
            )
          }
        />
        <Route
          path="/register"
          element={
            register && (
              <RegisterPage
                registerHandler={registerHandler}
                loginHandler={props.loginHandler}
                loginUser={loginUser}
              />
            )
          }
        />
      </Routes>
    </div>
  );
};

export default StartPage;
