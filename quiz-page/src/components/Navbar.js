import "./Navbar.css";
import "./QuizDropdown";
import "./Answers";
import "./Quizzes";
import QuizDropdown from "./QuizDropdown";

const Navbar = (props) => {
  return (
    <div>
      <div className="Navigation-bar">
        {props.isLoggedIn && (
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
        )}
        {!props.isLoggedIn && (
          <div>
            <a href="/StartPage">Login</a>
            <a href="/StartPage/Register" onClick={props.registerHandler}>
              Register
            </a>
          </div>
        )}
        <div className="Float-right">
          <a href="Help.asp">Help</a>
          {props.isLoggedIn && <a href="/StartPage">Logout</a>}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
