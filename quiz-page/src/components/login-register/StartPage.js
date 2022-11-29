import "./StartPage.css";
import Navbar from "../Navbar";
import { useState } from "react";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import axios from "axios";
import { Routes, Route } from "react-router-dom";

const StartPage = (props) => {
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

  // const pathCheck = props.path === "login";
  // console.log("pathCheck", pathCheck, !pathCheck);
  // console.log("path", props.path);

  return (
    <div>
      <Routes>
        <Route
          path="login"
          element={
            <LoginPage
              loginHandler={props.loginHandler}
              loginUser={loginUser}
              dispatch={props.dispatch}
            />
          }
        />
        <Route
          path="register"
          element={
            <RegisterPage
              loginHandler={props.loginHandler}
              loginUser={loginUser}
              dispatch={props.dispatch}
            />
          }
        />
      </Routes>
    </div>
  );
};

export default StartPage;
