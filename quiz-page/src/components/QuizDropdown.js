import "./Navbar.css";

const QuizDropdown = (props) => {
  return (
    <button
      className="dropdown-buttons"
      onClick={(event) => {
        props.dispatch({
          type: "QUIZ_SELECTED",
          payload: {
            quizIndex: props.index,
            quizSelected: true,
          },
        });
      }}
      href="#"
    >
      {props.quizName}
    </button>
  );
};

export default QuizDropdown;
