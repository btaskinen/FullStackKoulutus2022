import "./Navbar.css";
import "./QuizDropdown";
import "./admin-components/AdminAnswers";
import "./Quizzes";
import QuizDropdown from "./QuizDropdown";

const Navbar = (props) => {
  return (
    <div>
      <div className="Navigation-bar">
        {props.isLoggedIn && !props.isAdmin && (
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
        {props.isLoggedIn && props.isAdmin && (
          <div className="dropdown">
            {props.adminMode && <button className="dropbtn">Edit Quiz</button>}
            {!props.adminMode && <button className="dropbtn">Quiz</button>}
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
            <button className="nav-btn" onClick={props.registerHandler}>
              Login
            </button>
            <button className="nav-btn" onClick={props.registerHandler}>
              Register
            </button>
          </div>
        )}
        <div className="float-right">
          {props.isLoggedIn && props.isAdmin && props.adminMode && (
            <button className="nav-btn" onClick={props.adminModeHandler}>
              User Mode
            </button>
          )}
          {props.isLoggedIn && props.isAdmin && !props.adminMode && (
            <button className="nav-btn" onClick={props.adminModeHandler}>
              Admin Mode
            </button>
          )}
          <button className="nav-btn">Help</button>
          {props.isLoggedIn && (
            <button className="nav-btn" onClick={props.logoutHandler}>
              Logout
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
