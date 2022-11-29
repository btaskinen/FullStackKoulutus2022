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
            quizName: props.quizName,
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
