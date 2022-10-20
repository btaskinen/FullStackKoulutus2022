import "./App.css";
import "./Answers";
import "./Quizzes";

const Navbar = (props) => {
  return (
    <div>
      <div className="Navigation-bar">
        <div className="dropdown">
          <button className="dropbtn">Quizzes</button>
          <div className="dropdown-content">
            {props.quizzes.map((quiz) => {
              return (
                <button
                  className="dropdown-buttons"
                  onClick={(event) =>
                    props.dispatch({
                      type: "QUIZ_CHANGER",
                      payload: event.target.value,
                    })
                  }
                  href="#"
                >
                  {quiz.quizName}
                </button>
              );
            })}
          </div>
        </div>
        <a href="Help.asp">Help</a>
        <div className="Float-right">
          <a href="Quit.asp">Quit</a>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
