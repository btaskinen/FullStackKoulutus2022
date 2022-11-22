import "./Navbar.css";
import "./QuizDropdown";
import "./Answers";
import "./Quizzes";
import QuizDropdown from "./QuizDropdown";

const Navbar = (props) => {
  // console.log(props);
  return (
    <div>
      <div className="Navigation-bar">
        <div className="dropdown">
          <button className="dropbtn">Quizzes</button>
          <div className="dropdown-content">
            {props.quizzes.map((quiz, index) => (
              <QuizDropdown
                key={index}
                quiz={quiz}
                quizIndex={index}
                dispatch={props.dispatch}
              />
            ))}
          </div>
        </div>
        <a href="Help.asp">Help</a>
        <div className="Float-right">
          <a href="Login.asp">Login</a>
          <a href="Register.asp">Register</a>
          <a href="Quit.asp">Logout</a>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
