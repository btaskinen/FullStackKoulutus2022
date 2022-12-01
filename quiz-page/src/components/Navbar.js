import "./Navbar.css";
import "./QuizDropdown";
import "./admin-components/AdminAnswers";
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
              {props.appData.data.map((quiz, index) => (
                <QuizDropdown
                  key={props.appData.data[index].quiz_id}
                  quizName={props.appData.data[index].quiz_name}
                  quizId={props.appData.data[index].quiz_id}
                  index={index}
                  dispatch={props.dispatch}
                />
              ))}
            </div>
          </div>
        )}
        {!props.isLoggedIn && (
          <div>
            <a href="/Login">Login</a>
            <a href="/Register" onClick={props.registerHandler}>
              Register
            </a>
          </div>
        )}
        <div className="Float-right">
          {props.isLoggedIn && <a href="/AdminMode">Admin Mode</a>}
          <a href="/Help">Help</a>
          {props.isLoggedIn && (
            <a href="/" onClick={props.logoutHandler}>
              Logout
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
