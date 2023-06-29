import "./QuizButton.css";

const QuizButton = (props) => {
  return (
    <button
      className="quiz-button"
      onClick={(event) => {
        props.dispatch({
          type: "QUIZ_SELECTED",
          payload: {
            quizIndex: props.index,
            quizSelected: true,
          },
        });
      }}
    >
      {props.quizName}
    </button>
  );
};

export default QuizButton;
