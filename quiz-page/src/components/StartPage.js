import "./StartPage.css";
import Navbar from "./Navbar";
import { useState } from "react";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";

const StartPage = (props) => {
  const [register, setRegister] = useState(false);

  const registerHandler = () => {
    setRegister((current) => !current);
  };

  return (
    <div>
      <Navbar
        isLoggedin={props.isLoggedin}
        quizzes={props.quizzes}
        dispatch={props.dispatch}
        registerHandler={registerHandler}
      />
      {!register && (
        <LoginPage
          registerHandler={registerHandler}
          loginHandler={props.loginHandler}
        />
      )}
      {register && (
        <RegisterPage
          registerHandler={registerHandler}
          loginHandler={props.loginHandler}
        />
      )}
    </div>
  );
};

export default StartPage;
