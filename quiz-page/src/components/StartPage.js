import "./StartPage.css";
import Navbar from "./Navbar";
import { useState } from "react";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";

const StartPage = (props) => {
  const [wantRegister, setwantRegister] = useState(false);

  const registerHandler = () => {
    setwantRegister((current) => !current);
  };

  return (
    <div>
      <Navbar
        isLoggedin={props.isLoggedin}
        quizzes={props.quizzes}
        dispatch={props.dispatch}
        registerHandler={registerHandler}
      />
      {!wantRegister && <LoginPage registerHandler={registerHandler} />}
      {wantRegister && <RegisterPage registerHandler={registerHandler} />}
    </div>
  );
};

export default StartPage;
