import "./Navbar.css";

const QuizDropdown = (props) => {
  return (
    <button
      className="dropdown-buttons"
      onClick={(event) => {
        // console.log("quizIndex:", index);
        props.dispatch({
          type: "QUIZ_CHANGER",
          payload: {
            quizName: props.quiz.quizName,
            quizIndex: props.quizIndex,
          },
        });
      }}
      href="#"
    >
      {props.quiz.quizName}
    </button>
  );
};

export default QuizDropdown;
