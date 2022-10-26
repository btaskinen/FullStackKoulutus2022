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
            {props.quizzes.map((quiz, index) => {
              // console.log(quiz.quizName, index);
              return (
                <button
                  className="dropdown-buttons"
                  onClick={(event) => {
                    console.log("quizIndex:", index);
                    props.dispatch({
                      type: "QUIZ_CHANGER",
                      payload: {
                        quizName: quiz,
                        quizIndex: index,
                      },
                    });
                  }}
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
